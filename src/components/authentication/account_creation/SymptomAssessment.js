import React, { useEffect, useRef, useState } from "react";

import { Card, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import SymptomRow from "./components/SymptomRow";

export default function SymptomAssessment() {
  const { currentUser, getUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [truth, setTruth] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    setData(docSnap.data().symptoms);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/symptom-cause");
  }

  function goBack() {
    navigate("/account-creation");
  }

  //-------------------------------------------------------------------//

  const sideRef = useRef();
  const [side, setSide] = useState("Left");
  const bothRef = useRef();
  const [both, setBoth] = useState();

  function sideChoice() {
    console.log(sideRef.current.checked);
    setSide(sideRef.current.checked ? "Right" : "Left");
  }

  function bothChecked() {
    setBoth(bothRef.current.checked);
    console.log(bothRef.current.checked);
    console.log(bothRef.current.value);

    setSide("Left");
  }

  function SymptomsRow(props) {
    const rangeRef = useRef();
    const [range, setRange] = useState(1);

    function handleRangeChange() {
      setRange(rangeRef.current.value);
    }

    return (
      <Form.Group id="symptom" as={Row} className="pe-3">
        <Col sm={3}>
          <Form.Label>{props.symptom}</Form.Label>
        </Col>
        <Col sm={4}>
          <Form.Range
            id={"range"}
            min={1} // Lowest possible value
            max={10} // Highest possible value
            step={1}
            defaultValue={1}
            tickinterval={10}
            onChange={handleRangeChange}
            ref={rangeRef}
          />
        </Col>
        <Col sm={1}>
          <Form.Label>{range}</Form.Label>
        </Col>
        <Col sm={2}>
          <Form.Switch
            id="custom-switch"
            label={side}
            ref={sideRef}
            onChange={sideChoice}
          />
        </Col>
        <Col sm={2}>
          <Form.Check
            type="checkbox"
            name="cbBoth"
            label="Both"
            defaultChecked={both}
            ref={bothRef}
            onChange={bothChecked}
          />
        </Col>
      </Form.Group>
    );
  }

  function BothSymptomsRow() {
    const rangeRef = useRef();
    const [range, setRange] = useState(1);

    function handleRangeChange() {
      setRange(rangeRef.current.value);
    }

    return (
      <Form.Group id="symptom" as={Row} className="pe-3">
        <Col sm={3}></Col>
        <Col sm={4}>
          <Form.Range
            id={"range"}
            min={1} // Lowest possible value
            max={10} // Highest possible value
            step={1}
            defaultValue={1}
            tickinterval={10}
            onChange={handleRangeChange}
            ref={rangeRef}
          />
        </Col>
        <Col sm={1}>
          <Form.Label>{range}</Form.Label>
        </Col>
        <Col sm={2}>
          <Form.Switch
            id="custom-switch"
            defaultChecked="false"
            label={"Right"}
            ref={sideRef}
            onChange={sideChoice}
            disabled
          />
        </Col>
      </Form.Group>
    );
  }

  return (
    <>
      <h1 className="display-1 text-center mb-4">Symptom Assessment</h1>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">How severe are your symptoms?</h3>
          <Form onSubmit={handleSubmit}>
            {data[0] !== undefined ? <SymptomsRow symptom={data[0]} /> : ""}
            {data[0] !== undefined && both ? (
              <BothSymptomsRow symptom={data[0]} />
            ) : (
              ""
            )}
            {data[1] !== undefined ? <SymptomsRow symptom={data[1]} /> : ""}
            {data[1] !== undefined && both ? (
              <BothSymptomsRow symptom={data[1]} />
            ) : (
              ""
            )}
            {data[2] !== undefined ? <SymptomsRow symptom={data[2]} /> : ""}
            {data[2] !== undefined && both ? (
              <BothSymptomsRow symptom={data[2]} />
            ) : (
              ""
            )}
            {data[3] !== undefined ? <SymptomsRow symptom={data[3]} /> : ""}
            {data[3] !== undefined && both ? (
              <BothSymptomsRow symptom={data[3]} />
            ) : (
              ""
            )}
            {data[4] !== undefined ? <SymptomsRow symptom={data[4]} /> : ""}
            {data[4] !== undefined && both ? (
              <BothSymptomsRow symptom={data[4]} />
            ) : (
              ""
            )}
            {data[5] !== undefined ? <SymptomsRow symptom={data[5]} /> : ""}
            {data[5] !== undefined && both ? (
              <BothSymptomsRow symptom={data[5]} />
            ) : (
              ""
            )}
            {data[6] !== undefined ? <SymptomsRow symptom={data[6]} /> : ""}
            {data[6] !== undefined && both ? (
              <BothSymptomsRow symptom={data[6]} />
            ) : (
              ""
            )}
            <div className="d-flex flex-row justify-content-center mt-3">
              <Button
                disabled={loading}
                className="w-50 me-3"
                type="button"
                onClick={goBack}
              >
                Back
              </Button>
              <Button disabled={loading} className="w-50" type="submit">
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

// {data[0] !== undefined ? <SymptomRow symptom={data[0]} /> : ""}
// {both ? <BothSymptomsRow symptom={data[0]} /> : ""}
// {data[1] !== undefined ? <SymptomRow symptom={data[1]} /> : ""}
// {both ? <BothSymptomsRow symptom={data[1]} /> : ""}
// {data[2] !== undefined ? <SymptomRow symptom={data[2]} /> : ""}
// {both ? <BothSymptomsRow symptom={data[2]} /> : ""}
// {data[3] !== undefined ? <SymptomRow symptom={data[3]} /> : ""}
// {both ? <BothSymptomsRow symptom={data[3]} /> : ""}
// {data[4] !== undefined ? <SymptomRow symptom={data[4]} /> : ""}
// {both ? <BothSymptomsRow symptom={data[4]} /> : ""}
// {data[5] !== undefined ? <SymptomRow symptom={data[5]} /> : ""}
// {both ? <BothSymptomsRow symptom={data[5]} /> : ""}
