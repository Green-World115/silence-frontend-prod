import React, { useRef, useState } from "react";

import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function SymptomRow(props) {
  const rangeRef = useRef();
  const [range, setRange] = useState(1);
  const sideRef = useRef();
  const [side, setSide] = useState("Left");
  const bothRef = useRef();
  const [both, setBoth] = useState(false);

  function sideChoice() {
    console.log(sideRef.current.checked);
    setSide(sideRef.current.checked ? "Right" : "Left");
  }

  function handleRangeChange() {
    setRange(rangeRef.current.value);
  }

  function bothChecked() {
    setBoth(bothRef.current.checked);
    setSide("Left");
  }

  return (
    <Form.Group id="symptom" as={Row} className="pe-3">
      <Col sm={3}>
        <Form.Label>{data[0]}</Form.Label>
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
