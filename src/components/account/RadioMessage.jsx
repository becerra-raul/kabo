import React from "react";

const RadioMessage = ({ title, text, buttonTitle }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-md mb-3">
      <p className="text-xl font-medium mb-2">{title}</p>
      <p className="font-xs text-gray-700">{text}</p>
      <button className="text-green-600 text-base font-medium mt-2">
        {buttonTitle}
      </button>
    </div>
  );
};

export default RadioMessage;
