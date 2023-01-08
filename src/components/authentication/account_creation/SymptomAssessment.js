import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

import { getSymptomByUser } from "../../../api/symptoms";
import SymptomForm from "./components/SymptomForm";

export default function SymptomAssessment() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState({});

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const response = await getSymptomByUser(currentUser.uid);
        setSymptoms(response.data().symptoms);
      } catch (error) {}

      setLoading(false);
    };

    get();
  }, []);

  return (
    <div className="p-4">
      <h1 className="display-1 text-center mb-4">Symptom Assessment</h1>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-1">How severe are your symptoms?</h3>
          {loading ? <h4 className="p-4">Loading...</h4> : <SymptomForm initialValues={symptoms} />}
        </Card.Body>
      </Card>
    </div>
  );
}
