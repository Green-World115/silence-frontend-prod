import { useEffect, useState } from "react";
import * as userApi from "api/user";
import * as symptomApi from "api/symptoms";
import values from "lodash/values";
import merge from "lodash/merge";
import keyBy from "lodash/keyBy";

export const useCreateAccount = (activeTab) => {
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState();
  const [causes, setCauses] = useState([]);

  useEffect(() => {
    const getTab0 = async () => {
      setLoading(true);
      const email = sessionStorage.getItem("temp-email");
      const [symptomsResponse, userResponse] = await Promise.all([
        symptomApi.getSymptoms(),
        userApi.getUserByEmail(email),
      ]);

      const userSymptomsResponse = await symptomApi.getUserSymptoms(userResponse.data?.id);

      const formattedSymptoms = symptomsResponse.data?.map((symptom) => ({
        ...symptom,
        symptomId: symptom.id,
        value: {
          left: 0,
          right: 0,
          value: 0,
        },
      }));
      const formattedUserSymptoms = userSymptomsResponse.data?.map((userSymptom) => ({
        id: userSymptom.id,
        symptomId: userSymptom.symptom?.id,
        value: userSymptom.value,
      }));

      const userSymptoms = values(
        merge(keyBy(formattedSymptoms, "symptomId"), keyBy(formattedUserSymptoms, "symptomId"))
      );
      setBasicInfo({
        ...userResponse?.data,
        userSymptoms,
      });
      setLoading(false);
    };

    const getTab1 = async () => {
      setLoading(true);
      const email = sessionStorage.getItem("temp-email");
      const userResponse = await userApi.getUserByEmail(email);
      const userSymptomsResponse = await symptomApi.getUserSymptoms(userResponse.data?.id);

      const formattedSymptoms = userSymptomsResponse.data?.map((userSymptom) => ({
        symptomName: userSymptom.symptom.name,
        causes: userSymptom.causes,
        id: userSymptom.id,
      }));
      setCauses({ userSymptoms: formattedSymptoms });
      setLoading(false);
    };

    if (activeTab === 0) getTab0();
    if (activeTab === 1) getTab1();
  }, [activeTab]);

  return { loading, basicInfo, causes };
};
