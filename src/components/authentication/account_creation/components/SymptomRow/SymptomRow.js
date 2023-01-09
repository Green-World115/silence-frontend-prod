import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Controller } from "react-hook-form";
import styles from "./symptomRow.module.scss";

export default function SymptomRow({ name, label, control, setValue, watch }) {
  const type = watch(`${name}.type`);

  return (
    <div className="pb-4 pt-4 border-bottom">
      <Row>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>{label}</h5>
          </div>
          <div className="d-flex ">
            <Controller
              control={control}
              name={`${name}.type`}
              render={({ field }) => (
                <Form.Group {...field}>
                  <Form.Check inline type="radio" label="Left" value="left" checked={field.value === "left"} readOnly />
                  <Form.Check
                    inline
                    type="radio"
                    label="Right"
                    value="right"
                    checked={field.value === "right"}
                    readOnly
                  />
                  <Form.Check inline type="radio" label="Both" value="both" checked={field.value === "both"} readOnly />
                </Form.Group>
              )}
            />
          </div>
        </div>
      </Row>

      <Row>
        {(type === "left" || type === "both") && (
          <Col xs={6}>
            <div>
              <Form.Label className="mr-2">Left</Form.Label>
              <Controller
                control={control}
                name={`${name}.left`}
                render={({ field }) => (
                  <div className={styles.slideContainer}>
                    <div className={styles.tickContainer}>
                      {[...Array(11)].map((item) => (
                        <div className={styles.tick} />
                      ))}
                    </div>
                    <Form.Range {...field} min={0} max={10} step={1} />
                  </div>
                )}
              />
            </div>
          </Col>
        )}
        {(type === "right" || type === "both") && (
          <Col xs={6}>
            <div>
              <Form.Label className="mr-2">Right</Form.Label>
              <Controller
                control={control}
                name={`${name}.right`}
                render={({ field }) => (
                  <div className={styles.slideContainer}>
                    <div className={styles.tickContainer}>
                      {[...Array(11)].map((item) => (
                        <div className={styles.tick} />
                      ))}
                    </div>
                    <Form.Range {...field} min={0} max={10} step={1} />
                  </div>
                )}
              />
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}
