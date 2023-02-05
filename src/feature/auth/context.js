import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../../utils/superbase-client";
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("authContext has to be used within <AuthContext.Provider>");
  }
  return authContext;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log(data);
      setUser({ email: data.session.user.email });
    });

    supabase.auth.onAuthStateChange((_event, session) => {});
  }, []);

  return { user };
};

export default AuthProvider;
