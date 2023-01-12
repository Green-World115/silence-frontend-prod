import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateSymptoms } from "../../../../api/symptoms";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../contexts/AuthContext";
import SymptomRow from "./SymptomRow";

export default function SymptomForm({ initialValues, page }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialValues,
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateSymptoms(currentUser.uid, data);
      navigate("/symptom-cause");
    } catch (error) {
      setError("Failed to update symptoms");
    }
    setLoading(false);
  };

  const handleBack = () => navigate("/account-creation");

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {initialValues.tinnitus && (
            <SymptomRow
              control={control}
              name="tinnitus"
              label="Tinnitus"
              setValue={setValue}
              watch={watch}
            />
          )}
          {initialValues.pulsatileTinnitus && (
            <SymptomRow
              control={control}
              name="pulsatileTinnitus"
              label="Pulsatile Tinnitus"
              setValue={setValue}
              watch={watch}
            />
          )}
          {initialValues.vertigo && (
            <SymptomRow
              control={control}
              name="vertigo"
              label="Vertigo"
              setValue={setValue}
              watch={watch}
            />
          )}
          {initialValues.hyperacusis && (
            <SymptomRow
              control={control}
              name="hyperacusis"
              label="Hyperacusis"
              setValue={setValue}
              watch={watch}
            />
          )}
          {initialValues.hearingLoss && (
            <SymptomRow
              control={control}
              name="hearingLoss"
              label="Hearing Loss"
              setValue={setValue}
              watch={watch}
            />
          )}
          {initialValues.visualSnow && (
            <SymptomRow
              control={control}
              name="visualSnow"
              label="Visual Snow"
              setValue={setValue}
              watch={watch}
            />
          )}
        </div>

        {page !== "profile" ? (
          <div className="d-flex flex-row justify-content-center mt-3">
            <Button
              disabled={loading}
              className="w-25 me-3"
              type="button"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button disabled={loading} className="w-25" type="submit">
              Next
            </Button>
          </div>
        ) : (
          <Button disabled={loading} className="w-50" type="submit">
            Update
          </Button>
        )}
      </Form>
    </>
  );
}
