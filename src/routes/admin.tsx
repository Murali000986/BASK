import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Key,
  Inbox,
  LogOut,
  Trash2,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  ChevronRight,
  Bot,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Copy,
  Check,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import {
  getStoredKeys,
  saveKeys,
  getChatLogs,
  clearChatLogs,
  type AIKeys,
  type ChatSession,
} from "@/lib/aiService";

const ADMIN_EMAIL = "murali701081@gmail.com";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Panel — BASK" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Tab = "overview" | "chatlogs" | "knowledgebase" | "apikeys" | "enquiries" | "users";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useEnquiries() {
  const [enquiries, setEnquiries] = useState<Record<string, unknown>[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bask_enquiries");
      setEnquiries(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);
  return enquiries;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex rounded-xl p-2.5 ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-[28px] font-700 text-slate-900 leading-none">{value}</p>
      <p className="mt-1 text-[13px] text-slate-500">{label}</p>
    </div>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────
function OverviewTab() {
  const logs = getChatLogs();
  const enquiries = useEnquiries();
  const totalMessages = logs.reduce((acc, s) => acc + s.messages.length, 0);
  const providers = logs.reduce(
    (acc, s) => {
      acc[s.provider] = (acc[s.provider] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-[22px] font-700 text-slate-900">Overview</h2>
        <p className="text-[14px] text-slate-500 mt-1">Live stats from your visitors' interactions.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={MessageSquare} label="Chat Sessions" value={logs.length} color="bg-indigo-500" />
        <StatCard icon={Users} label="Total Messages" value={totalMessages} color="bg-purple-500" />
        <StatCard icon={Inbox} label="Enquiries" value={enquiries.length} color="bg-emerald-500" />
        <StatCard icon={TrendingUp} label="Avg Messages/Chat" value={logs.length ? Math.round(totalMessages / logs.length) : 0} color="bg-orange-500" />
      </div>

      {/* Provider breakdown */}
      {Object.keys(providers).length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-600 text-slate-800 mb-4">AI Provider Usage</h3>
          <div className="space-y-3">
            {Object.entries(providers).map(([p, count]) => {
              const pct = Math.round((count / logs.length) * 100);
              const colors: Record<string, string> = {
                gemini: "bg-indigo-500",
                cohere: "bg-purple-500",
                grok: "bg-emerald-500",
              };
              return (
                <div key={p}>
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="font-500 text-slate-700 capitalize">{p}</span>
                    <span className="text-slate-500">{count} sessions ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[p] ?? "bg-slate-400"} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent sessions */}
      {logs.length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-600 text-slate-800 mb-4">Recent Sessions</h3>
          <div className="space-y-2">
            {logs.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Bot className="h-4 w-4 text-indigo-500" />
                  <div>
                    <p className="text-[13px] font-500 text-slate-700">
                      {s.userName ? `${s.userName}: ` : ""}{s.messages.find((m) => m.role === "user")?.content.slice(0, 40) ?? "Session"}…
                    </p>
                    <p className="text-[11.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {new Date(s.startedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-[12px] text-slate-400 capitalize">{s.provider}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Chat Logs ───────────────────────────────────────────────────────────
function ChatLogsTab() {
  const [logs, setLogs] = useState<ChatSession[]>([]);
  const [selected, setSelected] = useState<ChatSession | null>(null);

  useEffect(() => {
    setLogs(getChatLogs());
  }, []);

  const handleClear = () => {
    if (!confirm("Clear all chat logs? This cannot be undone.")) return;
    clearChatLogs();
    setLogs([]);
    setSelected(null);
  };

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <MessageSquare className="h-12 w-12 text-slate-300 mb-4" />
        <p className="font-600 text-slate-600">No chat logs yet</p>
        <p className="text-[13.5px] text-slate-400 mt-1">Conversations will appear here once visitors use the chat widget.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-[22px] font-700 text-slate-900">Chat Logs</h2>
          <p className="text-[14px] text-slate-500 mt-1">{logs.length} session{logs.length !== 1 ? "s" : ""} recorded</p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[13px] font-500 text-red-600 transition-colors hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" /> Clear All
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Session list */}
        <div className="lg:col-span-2 space-y-2 max-h-[520px] overflow-y-auto pr-1">
          {logs.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                selected?.id === s.id
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/40"
              }`}
            >
              <div className="flex justify-between items-start mb-0.5">
                <p className="text-[13px] font-600 text-slate-800 truncate pr-2">
                  {s.userName ? s.userName : (s.userEmail ? s.userEmail : "Anonymous")}
                </p>
                <span className="text-[10px] uppercase font-600 tracking-wider text-slate-400 mt-0.5">
                  {s.provider}
                </span>
              </div>
              <p className="text-[12.5px] text-slate-600 truncate">
                {s.messages.find((m) => m.role === "user")?.content ?? "Chat session"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(s.startedAt).toLocaleString()} · {s.messages.length} msgs
              </p>
            </button>
          ))}
        </div>

        {/* Conversation detail */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-100 bg-white p-5 max-h-[520px] overflow-y-auto shadow-sm">
          {selected ? (
            <div className="space-y-3">
              <p className="text-[11.5px] text-slate-400 font-500 uppercase tracking-wide">
                Session · {new Date(selected.startedAt).toLocaleString()} · {selected.provider}
              </p>
              {selected.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-tr-sm bg-indigo-500 text-white"
                        : "rounded-tl-sm bg-slate-100 text-slate-700"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              <div className="text-center">
                <ChevronRight className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-[13.5px]">Select a session to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Knowledge Base ──────────────────────────────────────────────────────
function KnowledgeBaseTab() {
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bask_kb_override");
    if (stored) {
      setJson(stored);
    } else {
      import("@/data/knowledgeBase.json").then((mod) => {
        setJson(JSON.stringify(mod.default, null, 2));
      });
    }
  }, []);

  const handleSave = () => {
    try {
      JSON.parse(json); // validate
      localStorage.setItem("bask_kb_override", json);
      setError("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError("Invalid JSON — " + (e as Error).message);
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset to default knowledge base?")) return;
    localStorage.removeItem("bask_kb_override");
    const mod = await import("@/data/knowledgeBase.json");
    setJson(JSON.stringify(mod.default, null, 2));
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-[22px] font-700 text-slate-900">Knowledge Base</h2>
          <p className="text-[14px] text-slate-500 mt-1">Edit the JSON that powers the AI assistant's answers.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-500 text-slate-600 transition-colors hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-[13px] font-500 text-white transition-colors hover:bg-indigo-700"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <BookOpen className="h-4 w-4 text-slate-400" />
          <span className="text-[12.5px] font-500 text-slate-500">knowledgeBase.json</span>
        </div>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          spellCheck={false}
          className="w-full bg-[#1e1e2e] font-mono text-[12.5px] text-[#cdd6f4] p-5 focus:outline-none resize-none"
          style={{ height: 520, minHeight: 300 }}
        />
      </div>
    </div>
  );
}

// ─── Tab: API Keys ────────────────────────────────────────────────────────────
function ApiKeysTab() {
  const [keys, setKeys] = useState<AIKeys>({ gemini: "", cohere: "", grok: "" });
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setKeys(getStoredKeys());
  }, []);

  const handleSave = () => {
    saveKeys(keys);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: Array<{ id: keyof AIKeys; label: string; placeholder: string; docsUrl: string; color: string }> = [
    {
      id: "gemini",
      label: "Google AI Studio (Gemini)",
      placeholder: "AIza...",
      docsUrl: "https://aistudio.google.com/apikey",
      color: "bg-blue-500",
    },
    {
      id: "cohere",
      label: "Cohere",
      placeholder: "sk-...",
      docsUrl: "https://dashboard.cohere.com/api-keys",
      color: "bg-purple-500",
    },
    {
      id: "grok",
      label: "xAI / Grok",
      placeholder: "xai-...",
      docsUrl: "https://console.x.ai/",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[22px] font-700 text-slate-900">API Keys</h2>
        <p className="text-[14px] text-slate-500 mt-1">
          Stored securely in your browser's localStorage. Priority: Gemini → Cohere → Grok (auto-fallback on rate limit).
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 flex gap-3">
        <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[13px] text-amber-700">
          Keys are stored only in your browser — they never leave your device or get sent to any server other than the AI providers directly.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-block h-3 w-3 rounded-full ${f.color}`} />
              <p className="font-600 text-[14px] text-slate-800">{f.label}</p>
              <a
                href={f.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[12px] text-indigo-500 hover:underline"
              >
                Get free key →
              </a>
            </div>
            <div className="relative">
              <input
                type={show[f.id] ? "text" : "password"}
                value={keys[f.id]}
                onChange={(e) => setKeys({ ...keys, [f.id]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-[13.5px] font-mono text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShow((v) => ({ ...v, [f.id]: !v[f.id] }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {show[f.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {keys[f.id] && (
              <p className="mt-2 text-[11.5px] text-emerald-600 flex items-center gap-1">
                <Check className="h-3 w-3" /> Key configured
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-[14px] font-600 text-white transition-colors hover:bg-indigo-700 shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
      >
        {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? "Saved successfully!" : "Save API Keys"}
      </button>
    </div>
  );
}

// ─── Tab: Enquiries ───────────────────────────────────────────────────────────
function EnquiriesTab() {
  const enquiries = useEnquiries();
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  if (enquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Inbox className="h-12 w-12 text-slate-300 mb-4" />
        <p className="font-600 text-slate-600">No enquiries yet</p>
        <p className="text-[13.5px] text-slate-400 mt-1">Form submissions from the Contact page will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[22px] font-700 text-slate-900">Enquiries</h2>
        <p className="text-[14px] text-slate-500 mt-1">{enquiries.length} submission{enquiries.length !== 1 ? "s" : ""} received</p>
      </div>
      <div className="space-y-3">
        {enquiries.map((enq, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                {Object.entries(enq).map(([k, v]) => (
                  <div key={k} className="flex gap-3 text-[13px]">
                    <span className="w-28 shrink-0 font-500 text-slate-500 capitalize">{k}</span>
                    <span className="text-slate-700">{String(v)}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => copyToClipboard(JSON.stringify(enq, null, 2), i)}
                className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
              >
                {copied === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Users ───────────────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bask_users");
      setUsers(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Users className="h-12 w-12 text-slate-300 mb-4" />
        <p className="font-600 text-slate-600">No users yet</p>
        <p className="text-[13.5px] text-slate-400 mt-1">People who log in via Google will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[22px] font-700 text-slate-900">Registered Users</h2>
        <p className="text-[14px] text-slate-500 mt-1">{users.length} user{users.length !== 1 ? "s" : ""} recorded</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-3 text-[12px] font-600 text-slate-500 uppercase tracking-wider">
          <div className="col-span-6 md:col-span-4">User</div>
          <div className="hidden md:block col-span-4">Email</div>
          <div className="col-span-6 md:col-span-4 text-right">Last Login</div>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((u, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                <img src={u.picture} alt={u.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100" />
                <div className="min-w-0">
                  <p className="text-[14px] font-600 text-slate-800 truncate">{u.name}</p>
                  <p className="md:hidden text-[12px] text-slate-500 truncate">{u.email}</p>
                </div>
              </div>
              <div className="hidden md:block col-span-4 text-[13.5px] text-slate-600 truncate">
                {u.email}
              </div>
              <div className="col-span-6 md:col-span-4 text-right text-[13px] text-slate-500">
                {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Unknown"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guard: only admin email
  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    if (user.email !== ADMIN_EMAIL) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Checking access…
        </div>
      </div>
    );
  }

  const TABS: Array<{ id: Tab; label: string; icon: React.ElementType }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "chatlogs", label: "Chat Logs", icon: MessageSquare },
    { id: "knowledgebase", label: "Knowledge Base", icon: BookOpen },
    { id: "apikeys", label: "API Keys", icon: Key },
    { id: "enquiries", label: "Enquiries", icon: Inbox },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-100 bg-white fixed inset-y-0 left-0">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <Logo />
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-indigo-600">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13.5px] font-500 transition-all text-left ${
                tab === t.id
                  ? "bg-indigo-50 text-indigo-700 font-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <t.icon className={`h-4 w-4 ${tab === t.id ? "text-indigo-600" : "text-slate-400"}`} />
              {t.label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
            <img src={user.picture} alt={user.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-200" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-600 text-slate-800 truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => { logout(); navigate({ to: "/" }); }}
              title="Sign out"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile header ─────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-xl px-4 py-3">
        <Logo />
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-500 text-slate-600"
        >
          {TABS.find((t) => t.id === tab)?.label}
        </button>
      </div>

      {/* Mobile tab picker */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 inset-x-4 rounded-2xl border border-slate-100 bg-white shadow-lift p-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-500 text-left transition-all ${
                  tab === t.id ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
                }`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-64 px-4 py-8 lg:px-10 lg:py-10 mt-16 lg:mt-0 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {tab === "overview" && <OverviewTab />}
          {tab === "users" && <UsersTab />}
          {tab === "chatlogs" && <ChatLogsTab />}
          {tab === "knowledgebase" && <KnowledgeBaseTab />}
          {tab === "apikeys" && <ApiKeysTab />}
          {tab === "enquiries" && <EnquiriesTab />}
        </div>
      </main>
    </div>
  );
}
