import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Slider from "rc-slider";
import styles from "./plans.module.scss";
import classnames from "classnames";
import "rc-slider/assets/index.css";

const LITE = 97;
const TOT3 = 297;
const SILENCE = 997;

const Plans = () => {
  const [selectedValue, setSelectedValue] = useState(30);
  const [plan, setPlan] = useState(1);
  const [months, setMonths] = useState({ plan1: 0, plan2: 0, plan3: 0 });

  const handleSelectPlan = (value) => setPlan(value);

  useEffect(() => {
    const calculate = () => {
      const plan1 = (LITE - selectedValue) / 20;
      const plan2 = (TOT3 - selectedValue) / 20;
      const plan3 = (SILENCE - selectedValue) / 20;

      setMonths({ plan1, plan2, plan3 });
    };
    calculate();
  }, [selectedValue]);

  return (
    <div>
      <h4 className="h2 mb-4">Payment plans</h4>
      <Card>
        <Card.Body>
          <Card.Subtitle>Customize your plan</Card.Subtitle>
          <div className={styles.sliderContainer}>
            <Slider
              min={0}
              max={190}
              defaultValue={20}
              value={selectedValue}
              marks={{ 0: "$0", 30: "$30", 60: "$60", 90: "$90", 120: "$120", 150: "$150", 190: "$190" }}
              step={null}
              onChange={setSelectedValue}
            />
          </div>
          <div className={styles.planContainer}>
            <div
              className={classnames(styles.planItem, { [styles.planItemSelected]: plan === 1 })}
              onClick={() => handleSelectPlan(1)}
            >
              <p>LITE</p>
              <h4>${LITE}</h4>
              <span>Unlock in {months.plan1} months</span>
            </div>
            <div
              className={classnames(styles.planItem, { [styles.planItemSelected]: plan === 2 })}
              onClick={() => handleSelectPlan(2)}
            >
              <p>TOT3</p>
              <h4>${TOT3}</h4>
              <span>Unlock in {months.plan2} months</span>
            </div>
            <div
              className={classnames(styles.planItem, { [styles.planItemSelected]: plan === 3 })}
              onClick={() => handleSelectPlan(3)}
            >
              <p>SILENCE</p>
              <h4>${SILENCE}</h4>
              <span>Unlock in {months.plan3} months</span>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center mt-3">
            <Button className="w-50 me-3" type="button">
              Back
            </Button>
            <Button className="w-50" type="submit">
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Plans;
