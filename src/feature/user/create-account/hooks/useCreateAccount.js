import { useEffect, useState } from "react";
import * as userApi from "api/user";
import * as symptomApi from "api/symptoms";
import values from "lodash/values";
import merge from "lodash/merge";
import keyBy from "lodash/keyBy";

export const useCreateAccount = (activeTab) => {
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState();

  useEffect(() => {
    const getTab1 = async () => {
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

      const symptoms = values(
        merge(keyBy(formattedSymptoms, "symptomId"), keyBy(userSymptomsResponse.data, "symptomId"))
      );
      setBasicInfo({
        ...userResponse?.data,
        symptoms,
      });
      setLoading(false);
    };

    if (activeTab === 0) getTab1();
  }, [activeTab]);

  return { loading, basicInfo };
};
