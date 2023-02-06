import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { supabase } from "../utils/superbase-client";

export const addSymptom = (userId, symptoms) => {
  return setDoc(doc(db, "symptoms", userId), {
    userId,
    symptoms,
  });
};

export const getSymptomByUser = (userId) => {
  return getDoc(doc(db, "symptoms", userId));
};
export const updateSymptoms = (userId, symptoms) => {
  return updateDoc(doc(db, "symptoms", userId), {
    symptoms,
  });
};
export const updateSymptomCauses = (userId, symptomCauses, additionalSymptomCauses) => {
  return updateDoc(doc(db, "symptoms", userId), {
    symptomCauses,
    additionalSymptomCauses,
  });
};

export const getSymptoms = () => {
  return supabase.from("symptoms").select("name, id, type");
};
