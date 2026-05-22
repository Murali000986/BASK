import { createContext, useContext, useState } from "react";

export type AuthUser = {
  name: string;
  email: string;
  picture: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  onboardingDone: boolean;
  setOnboardingDone: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStored("nb_user", null));
  const [onboardingDone, setOnboardingDoneState] = useState<boolean>(
    () => getStored("nb_onboarding", false)
  );

  const login = (u: AuthUser) => {
    setUser(u);
    if (typeof window !== "undefined") localStorage.setItem("nb_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setOnboardingDoneState(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("nb_user");
      localStorage.removeItem("nb_onboarding");
    }
  };

  const setOnboardingDone = (v: boolean) => {
    setOnboardingDoneState(v);
    if (v && typeof window !== "undefined") localStorage.setItem("nb_onboarding", "true");
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
