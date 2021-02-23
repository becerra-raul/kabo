import React from "react";

const SorryMessage = ({closeHandler}) => {
  return (
    <React.Fragment>
      <p className="text-lg text-center font-medium text-gray-700">
        We are sorry to see you want to go
      </p>
      <div className="mt-5">
        <p className="text-center text-sm">
          We’ve sent you a confimation email to cancel your subscription
        </p>
      </div>
      <div className="mt-5 bg-yellow-100 p-5 text-gray-800 rounded-md text-center">
        <p className="text-lg font-medium">You can reactivate anytime</p>
        <p className="mt-3 text-sm font-medium">
          Placeholder keep in mind you can pause your account at anytime
        </p>
      </div>

      <div className="text-center mt-5">
        <button onClick={()=>closeHandler()} className="rounded-xl py-3 px-8 text-base font-bold bg-primary focus:outline-none text-white mt-2">
          Done
        </button>
      </div>
    </React.Fragment>
  );
};

export default SorryMessage;
