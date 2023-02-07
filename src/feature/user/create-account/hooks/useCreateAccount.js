import { useEffect, useState } from "react";
import * as userApi from "api/user";
import * as symptomApi from "api/symptoms";

export const useCreateAccount = (activeTab) => {
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState();
  const [symptomOptions, setSymptomOptions] = useState();

  useEffect(() => {
    const getTab1 = async () => {
      const email = sessionStorage.getItem("temp-email");
      const [symptoms, user] = await Promise.all([symptomApi.getSymptoms(), userApi.getUserByEmail(email)]);
      setSymptomOptions(symptoms.data);
      setBasicInfo(user.data);
      setLoading(false);
    };

    if (activeTab === 0) getTab1();
  }, [activeTab]);

  return { loading, basicInfo, symptomOptions };
};
