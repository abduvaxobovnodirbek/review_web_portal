import { useState, useEffect, FC } from "react";
import { Button, Steps } from "antd";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  showStepFirst,
  showStepSecond,
  showStepThird,
} from "../../../services/reviewSteps/reviewStepsSlice";
import { items, steps } from "./StepperConfigs";

const Stepper: FC = () => {
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleDispatch() {
      if (current === 0) {
        return dispatch(showStepFirst());
      } else if (current === 1) {
        return dispatch(showStepSecond());
      }
      return dispatch(showStepThird());
    }
    handleDispatch();
  }, [current, dispatch]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="w-[20%] border-r h-[80vh] sticky top-20">
      <Steps
        current={current}
        items={items}
        direction="vertical"
        className=" h-[300px] mt-12"
      />
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
