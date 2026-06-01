import { createContext, useContext, useState } from "react";
import { authSignIn, authSignOut, authSignUp } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  const user = session?.user ?? null;
  const token = session?.access_token ?? null;

  async function login(email, password) {
    const data = await authSignIn(email, password);
    setSession(data);
    return data;
  }

  async function register(email, password, name, phone) {
    const data = await authSignUp(email, password, { name, phone });
    return data;
  }

  async function logout() {
    try {
      if (token) await authSignOut(token);
    } finally {
      setSession(null);
    }
  }

  return <AuthContext.Provider value={{ user, token, session, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
