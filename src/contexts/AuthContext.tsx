import { createContext, useContext, useState, useEffect } from "react";

export type AuthUser = {
  name: string;
  email: string;
  picture: string;
  lastLogin?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  onboardingDone: boolean;
  setOnboardingDone: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [onboardingDone, setOnboardingDoneState] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nb_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    try {
      if (localStorage.getItem("nb_onboarding") === "true") setOnboardingDoneState(true);
    } catch {}
  }, []);

  const login = (u: AuthUser) => {
    setUser(u);
    try { 
      localStorage.setItem("nb_user", JSON.stringify(u));
      
      const rawUsers = localStorage.getItem("bask_users");
      const users: AuthUser[] = rawUsers ? JSON.parse(rawUsers) : [];
      const idx = users.findIndex(existing => existing.email === u.email);
      
      const updatedUser = { ...u, lastLogin: new Date().toISOString() };
      if (idx === -1) {
        users.unshift(updatedUser);
      } else {
        users[idx] = { ...users[idx], ...updatedUser };
      }
      localStorage.setItem("bask_users", JSON.stringify(users.slice(0, 500)));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setOnboardingDoneState(false);
    try {
      localStorage.removeItem("nb_user");
      localStorage.removeItem("nb_onboarding");
    } catch {}
  };

  const setOnboardingDone = (v: boolean) => {
    setOnboardingDoneState(v);
    if (v) {
      try { localStorage.setItem("nb_onboarding", "true"); } catch {}
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, onboardingDone, setOnboardingDone }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
