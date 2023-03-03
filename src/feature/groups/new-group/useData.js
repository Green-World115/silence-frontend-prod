import { useEffect, useState } from "react";
import * as symptomApi from "api/symptoms";
import * as userApi from "api/user";
import * as postApi from "api/post";

import { useUser } from "feature/auth/context";
import { useQuery } from "@tanstack/react-query";

export const useData = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({ symptoms: false, users: false });

  const user = useUser();

  const getUsers = async (symptoms, causes) => {
    setLoading({ ...loading, users: true });
    const userRes = await userApi.getUsersBySymptomsAndCauses(symptoms, causes);
    setUsers(userRes.data.filter((item) => item.id !== user.id));
    setLoading({ ...loading, users: false });
  };

  useEffect(() => {
    const get = async () => {
      setLoading({ ...loading, symptoms: true });
      const { data } = await symptomApi.getSymptoms();
      setSymptoms(data);
      setLoading({ ...loading, symptoms: false });
    };
    get();
  }, []);

  return { symptoms, users, loadingUser: loading.users, loadingSymptoms: loading.symptoms, getUsers };
};

export const useCategories = () => {
  const categories = useQuery({
    queryKey: ["group-categories"],
    queryFn: () => postApi.getGroupCategories(),
    select: (data) => data?.data?.map((item) => ({ id: item.id, label: item.name })),
    initialData: [],
  });

  return categories;
};
