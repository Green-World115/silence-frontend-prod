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

export const resetPassword = async (email) => {
  const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/change-password`,
  });
  if (error) throw error;
  else return data;
};
export const changePassword = async (password) => {
  const { error, data } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  else return data;
};
