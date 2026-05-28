import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, onboardingDone } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const profile = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${res.access_token}` },
      }).then((r) => r.json());

      login({ name: profile.name, email: profile.email, picture: profile.picture });

      if (onboardingDone) {
        navigate({ to: "/" });
      } else {
        navigate({ to: "/onboarding" });
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "murali701081@gmail.com" && password === "Murali@123") {
      login({
        name: "Admin",
        email: "murali701081@gmail.com",
        picture: "https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff",
      });
      navigate({ to: "/admin" });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#faf5ff] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-line bg-white p-8 shadow-lift">
          <h1 className="font-display text-[26px] font-700 tracking-[-0.02em] text-ink">
            Welcome back
          </h1>
          <p className="mt-2 text-[14.5px] text-ink-soft">
            Sign in to start your project brief with BASK.
          </p>

          <form onSubmit={handleManualLogin} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-[13px] text-red-600">
                {error}
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl border border-line bg-surface-muted/30 py-3 pl-10 pr-4 text-[14px] text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-line bg-surface-muted/30 py-3 pl-10 pr-4 text-[14px] text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3.5 text-[14.5px] font-600 text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-lift active:translate-y-0"
            >
              Sign In
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-[12px] font-500 text-ink-muted">OR</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <button
            onClick={() => handleGoogle()}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-[14.5px] font-600 text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
            <ArrowRight className="ml-auto h-4 w-4 text-ink-muted" />
          </button>

          <p className="mt-5 text-center text-[12px] text-ink-muted">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>

        <p className="mt-6 text-center text-[13px] text-ink-muted">
          <a href="/" className="underline underline-offset-2 hover:text-ink">
            ← Back to BASK
          </a>
        </p>
      </div>
    </div>
  );
}
