import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

type Answer = string | string[];

const STEPS = [
  {
    id: "service",
    question: "What type of service are you looking for?",
    hint: "Pick the one that fits best — you can always add more later.",
    type: "single",
    options: [
      { value: "web", label: "Website Design", icon: "🌐" },
      { value: "ecommerce", label: "Ecommerce Store", icon: "🛍️" },
      { value: "campaign", label: "Brand Campaign", icon: "📣" },
      { value: "video", label: "Video Production", icon: "🎬" },
      { value: "software", label: "Software / App", icon: "💻" },
    ],
  },
  {
    id: "budget",
    question: "What's your approximate budget?",
    hint: "This helps us scope the right team and timeline for you.",
    type: "single",
    options: [
      { value: "under50k", label: "Under ₹50,000", icon: "💸" },
      { value: "50k-2l", label: "₹50K – ₹2 Lakh", icon: "💰" },
      { value: "2l-10l", label: "₹2L – ₹10 Lakh", icon: "💎" },
      { value: "10l+", label: "₹10 Lakh+", icon: "🚀" },
    ],
  },
  {
    id: "timeline",
    question: "When do you need this delivered?",
    hint: "We'll plan the right team size and kickoff date around this.",
    type: "single",
    options: [
      { value: "asap", label: "ASAP (within a month)", icon: "⚡" },
      { value: "1-3m", label: "1 – 3 months", icon: "📅" },
      { value: "3-6m", label: "3 – 6 months", icon: "🗓️" },
      { value: "flexible", label: "Just exploring", icon: "👀" },
    ],
  },
  {
    id: "stage",
    question: "What best describes your brand or business?",
    hint: "Helps us tailor the right strategy and approach.",
    type: "single",
    options: [
      { value: "early", label: "Early-stage startup", icon: "🌱" },
      { value: "growing", label: "Growing brand", icon: "📈" },
      { value: "established", label: "Established business", icon: "🏢" },
      { value: "enterprise", label: "Enterprise", icon: "🌐" },
    ],
  },
  {
    id: "source",
    question: "How did you hear about Northbeam?",
    hint: "We love knowing where our projects come from.",
    type: "single",
    options: [
      { value: "google", label: "Google search", icon: "🔍" },
      { value: "social", label: "Social media", icon: "📱" },
      { value: "referral", label: "A referral", icon: "🤝" },
      { value: "other", label: "Somewhere else", icon: "✨" },
    ],
  },
] as const;

function OnboardingPage() {
  const { user, setOnboardingDone } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [done, setDone] = useState(false);

  const current = STEPS[step];
  const total = STEPS.length;
  const selected = answers[current?.id ?? ""] as string | undefined;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      setOnboardingDone(true);
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#faf5ff] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
            <Check className="h-10 w-10 text-brand" strokeWidth={2.5} />
          </div>
          <h2 className="font-display text-[28px] font-700 tracking-[-0.02em] text-ink">
            You're all set, {user?.name?.split(" ")[0]}!
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft">
            Thanks for sharing. Our team will be in touch shortly to craft the perfect proposal for you.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-[15px] font-600 text-white transition-all hover:bg-ink/90 hover:shadow-lift"
          >
            Explore Northbeam <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#f0f4ff] to-[#faf5ff] px-4 py-10">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-10 flex items-center justify-between">
          <Logo />
          {user && (
            <div className="flex items-center gap-2">
              <img src={user.picture} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
              <span className="text-[13px] font-500 text-ink-soft">{user.name.split(" ")[0]}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-[12px] font-500 text-ink-muted">
            <span>Step {step + 1} of {total}</span>
            <span>{Math.round(((step + 1) / total) * 100)}% complete</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <motion.div
              className="h-full rounded-full bg-brand"
              animate={{ width: `${((step + 1) / total) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <div className="rounded-3xl border border-line bg-white p-7 shadow-lift">
              <h2 className="font-display text-[22px] font-700 leading-snug tracking-[-0.02em] text-ink">
                {current.question}
              </h2>
              <p className="mt-1.5 text-[13.5px] text-ink-muted">{current.hint}</p>

              <div className="mt-6 grid gap-3">
                {current.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-150 ${
                        isSelected
                          ? "border-brand bg-brand/5 shadow-[0_0_0_1px] shadow-brand/30"
                          : "border-line bg-white hover:border-ink/20 hover:bg-surface-muted/50"
                      }`}
                    >
                      <span className="text-[22px] leading-none">{opt.icon}</span>
                      <span className={`text-[15px] font-600 ${isSelected ? "text-brand" : "text-ink"}`}>
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={!selected}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-[15px] font-600 text-white transition-all hover:bg-ink/90 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step < total - 1 ? "Continue" : "Finish"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
