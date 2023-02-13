import { useState, useEffect } from "react";
import * as userApi from "api/user";
import { useUser } from "feature/auth/context";
export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const user = useUser();

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const { data, error } = await userApi.getUserById(user.id);
      setProfile(data);
      setLoading(false);
    };

    get();
  }, []);

  return { profile, loading };
};
