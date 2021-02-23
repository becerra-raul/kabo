import React, {useEffect, useState} from "react";
import Modal from "../global/modal";
import Radio from "../global/radio";
import beefIcon from "../../assets/images/recipe/beef-100@2x.jpg";
import RadioMessage from "./RadioMessage";
import CancelDelivery from "./cancel-delivery";
import CancelReason from "./cancel-reasons";
import SorryMessage from "./sorry-message";

const CancelMealModal = ({
  currentDog,
  cancelUserSubscription,
  dogIndex,
  closeHandler
}) => {
  const [cancelType, setCancelType] = useState("1-delivery");
  const [step, setStep] = useState(1);

  const handleStep = (step) => {
    step = step + 1;
    setStep(step);
  };

  useEffect(() => {
    setStep(1);
  }, [])

  return (
    <div className="p-6">
        {step === 1 && (
          <CancelDelivery
            dogIndex={dogIndex}
            cancelType={cancelType}
            setCancelType={setCancelType}
          />
        )}
        {step === 2 && <CancelReason />}
        {step === 3 && <SorryMessage closeHandler={closeHandler}/>}

        {step !== 3 && (
          <div>
            <button
              className="rounded-xl py-3 px-8 text-base font-bold bg-primary focus:outline-none text-white mt-2"
              // onClick={() => cancelUserSubscription(currentDog.id)}
              onClick={() => handleStep(step)}
            >
              Next
            </button>
          </div>
        )}
      </div>
  );
};

export default CancelMealModal;
