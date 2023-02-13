import { supabase } from "../utils/superbase-client";

export const login = async (email, password) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signup = async (email, password) => {
  return supabase.auth.signUp({
    email,
    password,
    data: {
      confirmation_sent_at: Date.now(),
    },
  });
};
export const logout = async () => {
  return supabase.auth.signOut();
};
