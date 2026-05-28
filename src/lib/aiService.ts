import knowledgeBase from "@/data/knowledgeBase.json";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Provider = "gemini" | "cohere" | "grok";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIKeys {
  gemini: string;
  cohere: string;
  grok: string;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

export function getStoredKeys(): AIKeys {
  const envKeys = {
    gemini: import.meta.env.VITE_GEMINI_KEY || "",
    cohere: import.meta.env.VITE_COHERE_KEY || "",
    grok: import.meta.env.VITE_GROK_KEY || "",
  };

  try {
    const raw = localStorage.getItem("bask_ai_keys");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        gemini: parsed.gemini || envKeys.gemini,
        cohere: parsed.cohere || envKeys.cohere,
        grok: parsed.grok || envKeys.grok,
      };
    }
  } catch {}
  return envKeys;
}

export function saveKeys(keys: AIKeys) {
  try {
    localStorage.setItem("bask_ai_keys", JSON.stringify(keys));
  } catch {}
}

// ─── Chat log storage ─────────────────────────────────────────────────────────

export interface ChatSession {
  id: string;
  startedAt: string;
  messages: ChatMessage[];
  provider: Provider;
  userName?: string;
  userEmail?: string;
}

export function saveChatSession(session: ChatSession) {
  try {
    const raw = localStorage.getItem("bask_chat_logs");
    const logs: ChatSession[] = raw ? JSON.parse(raw) : [];
    const idx = logs.findIndex((s) => s.id === session.id);
    if (idx >= 0) logs[idx] = session;
    else logs.unshift(session);
    // keep last 200 sessions
    localStorage.setItem("bask_chat_logs", JSON.stringify(logs.slice(0, 200)));
  } catch {}
}

export function getChatLogs(): ChatSession[] {
  try {
    const raw = localStorage.getItem("bask_chat_logs");
    return raw ? JSON.parse(raw) : [];
  } catch {}
  return [];
}

export function clearChatLogs() {
  try {
    localStorage.removeItem("bask_chat_logs");
  } catch {}
}

// ─── System prompt builder ────────────────────────────────────────────────────

function buildSystemPrompt(): string {
  const kb = knowledgeBase as typeof knowledgeBase;

  const servicesText = kb.services
    .map(
      (s) =>
        `**${s.name}**: ${s.fullDesc}\nFeatures: ${s.features.join(", ")}\nPricing: ${s.pricing}\nTimeline: ${s.timeline}`
    )
    .join("\n\n");

  const faqText = kb.faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  return `${kb.aiInstructions}

=== COMPANY INFO ===
Name: ${kb.company.name}
Tagline: ${kb.company.tagline}
Description: ${kb.company.description}
Website: ${kb.company.website}
Email: ${kb.contact.email}
Phone: ${kb.contact.phone}
WhatsApp: ${kb.contact.whatsapp}
Location: ${kb.company.location}
Response time: ${kb.contact.responseTime}

=== SERVICES ===
${servicesText}

=== PROCESS ===
${kb.process.map((p) => `Step ${p.step} — ${p.title}: ${p.description}`).join("\n")}

=== FAQ ===
${faqText}

Always be concise (2–4 sentences max per reply unless detail is requested). Be friendly, professional and helpful.`;
}

// ─── Provider calls ───────────────────────────────────────────────────────────

async function callGemini(
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    }
  );

  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error(`Gemini error ${res.status}`);

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, no response.";
  return text;
}

async function callCohere(
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const chatHistory = messages.slice(0, -1).map((m) => ({
    role: m.role === "user" ? "USER" : "CHATBOT",
    message: m.content,
  }));

  const lastMessage = messages[messages.length - 1].content;

  const res = await fetch("https://api.cohere.com/v1/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "command-r-plus",
      message: lastMessage,
      chat_history: chatHistory,
      preamble: buildSystemPrompt(),
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error(`Cohere error ${res.status}`);

  const data = await res.json();
  return data?.text ?? "Sorry, no response.";
}

// Note: The key starting with gsk_ is a Groq (groq.com) key, not xAI Grok
async function callGrok(
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error(`Groq error ${res.status}`);

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "Sorry, no response.";
}

// ─── Main exported function ───────────────────────────────────────────────────

export interface SendMessageResult {
  text: string;
  provider: Provider;
}

export async function sendMessage(
  messages: ChatMessage[]
): Promise<SendMessageResult> {
  const keys = getStoredKeys();

  const providers: Array<{ name: Provider; key: string; fn: (msgs: ChatMessage[], key: string) => Promise<string> }> = [
    { name: "gemini", key: keys.gemini, fn: callGemini },
    { name: "cohere", key: keys.cohere, fn: callCohere },
    { name: "grok", key: keys.grok, fn: callGrok },
  ];

  let lastError: Error | null = null;

  for (const provider of providers) {
    if (!provider.key.trim()) continue; // skip if no key configured

    try {
      const text = await provider.fn(messages, provider.key);
      return { text, provider: provider.name };
    } catch (err) {
      console.error(`[${provider.name} failed]:`, err);
      lastError = err as Error;
      // Always try the next provider on any failure
      continue;
    }
  }

  // No keys configured at all → helpful message
  if (!keys.gemini && !keys.cohere && !keys.grok) {
    return {
      text: "Hi! I'm the BASK AI assistant. Please ask the admin to configure an API key so I can help you fully. In the meantime, you can reach BASK at murali701081@gmail.com or via the Contact page.",
      provider: "gemini",
    };
  }

  throw lastError ?? new Error("All AI providers failed");
}
