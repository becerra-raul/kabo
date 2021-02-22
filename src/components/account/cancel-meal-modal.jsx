import React, { useState } from "react";
import Modal from "../global/modal";
import Radio from "../global/radio";
import beefIcon from "../../assets/images/recipe/beef-100@2x.jpg";
import RadioMessage from "./RadioMessage";
import CancelDelivery from "./cancel-delivery";
import CancelReason from "./cancel-reasons";
import SorryMessage from "./sorry-message";

const CancelMealModal = ({
  isOpen,
  toggle,
  currentDog,
  cancelUserSubscription,
}) => {
  const [cancelType, setCancelType] = useState("1-delivery");
  const [step, setStep] = useState(1);

  const handleStep = (step) => {
    step = step + 1;
    setStep(step);
  };

  return (
    <Modal title="Cancel Kabo" isOpen={isOpen} onRequestClose={toggle}>
      <div className="p-6">
        {step === 1 && (
          <CancelDelivery
            cancelType={cancelType}
            setCancelType={setCancelType}
          />
        )}
        {step === 2 && <CancelReason />}
        {step === 3 && <SorryMessage />}

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
    </Modal>
  );
};

export default CancelMealModal;
