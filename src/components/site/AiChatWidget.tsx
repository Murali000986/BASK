"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChevronDown, RotateCcw, Phone, Mail, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";
import {
  sendMessage,
  saveChatSession,
  type ChatMessage,
  type Provider,
  type ChatSession,
} from "@/lib/aiService";

// ─── Session ID ───────────────────────────────────────────────────────────────
function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const PROVIDER_LABELS: Record<Provider, string> = {
  gemini: "Gemini",
  cohere: "Cohere",
  grok: "Grok",
};

const PROVIDER_COLORS: Record<Provider, string> = {
  gemini: "from-blue-500 to-indigo-500",
  cohere: "from-purple-500 to-pink-500",
  grok: "from-emerald-500 to-teal-500",
};

const SUGGESTED = [
  "Digital Marketing",
  "Web Development",
  "App Development",
  "Custom Query (AI)",
];

// ─── Contact Card ─────────────────────────────────────────────────────────────
function ContactButtons() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <a
        href="https://wa.me/919042846208"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-[13px] font-500 text-green-700 transition-all hover:bg-green-100 hover:border-green-300 shadow-sm active:scale-[0.98] no-underline"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shrink-0">
          <MessageCircle className="h-4 w-4" />
        </span>
        Chat on WhatsApp
      </a>
      <a
        href="mailto:murali701081@gmail.com"
        className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-[13px] font-500 text-indigo-700 transition-all hover:bg-indigo-100 hover:border-indigo-300 shadow-sm active:scale-[0.98] no-underline"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-white shrink-0">
          <Mail className="h-4 w-4" />
        </span>
        Email Support
      </a>
      <a
        href="tel:+919042846208"
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[13px] font-500 text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 shadow-sm active:scale-[0.98] no-underline"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-white shrink-0">
          <Phone className="h-4 w-4" />
        </span>
        Call Us
      </a>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AiChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Provider>("gemini");
  const [sessionId] = useState(() => makeId());
  const [sessionStart] = useState(() => new Date().toISOString());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // Persist chat session
  useEffect(() => {
    if (messages.length === 0) return;
    const session: ChatSession = {
      id: sessionId,
      startedAt: sessionStart,
      messages,
      provider,
      userName: user?.name,
      userEmail: user?.email,
    };
    saveChatSession(session);
  }, [messages, provider, sessionId, sessionStart, user]);

  const submit = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);

      try {
        const result = await sendMessage(next);
        setProvider(result.provider);
        setMessages([...next, { role: "assistant", content: result.text }]);
      } catch (err) {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              `Sorry, I'm having trouble connecting right now. **Error:** ${(err as Error).message}\n\nPlease check your API keys or try again.`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  const reset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <>
      {/* ── Floating Button ───────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-indigo-500 opacity-30 animate-ping" />
        )}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Open AI chat"
          className="relative h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_8px_32px_rgba(99,102,241,0.45)] flex items-center justify-center text-white transition-all"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-10 w-10 overflow-hidden rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-white"
              >
                <img src="/robot.png" alt="AI Bot" className="h-full w-full object-cover scale-[1.15]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Drawer ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-3xl border border-white/20 bg-white/80 shadow-[0_24px_80px_rgba(79,70,229,0.22),0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-2xl overflow-hidden"
            style={{ height: 560 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-700 text-white leading-tight">BASK AI Assistant</p>
                <p className="text-[11.5px] text-indigo-100">Ask anything about our services</p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={reset}
                  title="New conversation"
                  className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col gap-3 h-full">
                  {/* Welcome */}
                  <div className="flex items-start gap-2.5">
                    <motion.div 
                      animate={{ y: [0, -4, 0] }} 
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-white shadow-sm overflow-hidden"
                    >
                      <img src="/robot.png" alt="AI Bot" className="h-full w-full object-cover scale-[1.15]" />
                    </motion.div>
                    <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-[13.5px] leading-relaxed text-slate-700 max-w-[85%] shadow-sm border border-white/50">
                      Hi! 👋 I'm your BASK AI Assistant. Which service are you looking for today?
                    </div>
                  </div>

                  {/* Suggested questions */}
                  <p className="text-[11px] font-600 uppercase tracking-[0.12em] text-slate-400 px-1 mt-2">
                    Suggested questions
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => submit(q)}
                        className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-2.5 text-left text-[13px] font-500 text-indigo-700 transition-all hover:bg-indigo-100 hover:border-indigo-200 active:scale-[0.98]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.role === "assistant" && (
                      <motion.div 
                        animate={{ y: [0, -3, 0] }} 
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-white overflow-hidden mt-0.5 shadow-sm"
                      >
                        <img src="/robot.png" alt="AI Bot" className="h-full w-full object-cover scale-[1.15]" />
                      </motion.div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
                          : "rounded-tl-sm bg-slate-100 text-slate-700"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        (() => {
                          // Split content into text parts and [CONTACT_CARD] parts
                          const parts = msg.content.split("[CONTACT_CARD]");
                          return (
                            <>
                              {parts.map((part, pi) => (
                                <span key={pi}>
                                  {part && (
                                    <ReactMarkdown
                                      components={{
                                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                                        strong: ({ children }) => <strong className="font-600 text-slate-900">{children}</strong>,
                                        ul: ({ children }) => <ul className="mt-1 list-none pl-0 space-y-0.5">{children}</ul>,
                                        li: ({ children }) => {
                                          const getRawText = (arr: any): string => {
                                            if (typeof arr === "string") return arr;
                                            if (Array.isArray(arr)) return arr.map(getRawText).join("");
                                            if (arr && typeof arr === "object" && arr.props) return getRawText(arr.props.children);
                                            return "";
                                          };
                                          const text = getRawText(children);
                                          if (text.trim().startsWith("[OPT]")) {
                                            const btnText = text.replace("[OPT]", "").trim();
                                            return (
                                              <li className="list-none mt-2 mb-1">
                                                <button
                                                  onClick={() => submit(btnText)}
                                                  className="text-left w-full rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-[13px] font-500 text-indigo-700 transition-all hover:bg-indigo-50 hover:border-indigo-300 shadow-sm active:scale-[0.98]"
                                                >
                                                  {btnText}
                                                </button>
                                              </li>
                                            );
                                          }
                                          return <li className="list-disc ml-4">{children}</li>;
                                        },
                                      }}
                                    >
                                      {part}
                                    </ReactMarkdown>
                                  )}
                                  {pi < parts.length - 1 && <ContactButtons />}
                                </span>
                              ))}
                            </>
                          );
                        })()
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5">
                  <motion.div 
                    animate={{ y: [0, -3, 0] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-white overflow-hidden shadow-sm"
                  >
                    <img src="/robot.png" alt="AI Bot" className="h-full w-full object-cover scale-[1.15]" />
                  </motion.div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-white/60 px-4 py-3">

              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                  }}
                  onKeyDown={handleKey}
                  placeholder="Ask about BASK…"
                  disabled={loading}
                  className="flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50"
                  style={{ minHeight: 44, maxHeight: 96 }}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => submit(input)}
                  disabled={!input.trim() || loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)]"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
