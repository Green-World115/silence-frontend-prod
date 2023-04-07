import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/superbase-client";
const AuthContext = createContext(null);

const AuthProvider = ({ children, initialSession }) => {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, _session) => {
      if (_session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        console.log(_session);
        setSession({ ...session?.user, ..._session.user });
      }

      if (event === "SIGNED_OUT") {
        setSession(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("authContext has to be used within <AuthContext.Provider>");
  }
  return authContext?.session ?? null;
};

export default AuthProvider;
