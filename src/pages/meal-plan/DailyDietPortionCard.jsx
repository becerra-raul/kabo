import React from "react";
import { CircleSVG } from "./circle";



const DietPortionCard = ({ item, handleSelect, dietPortion }) => {
  let thenum = item.title.match(/\d+/)[0]
  if (thenum < 24) {
    thenum = 100
  }
  console.log(item.title)
  console.log(thenum)
  return (
    <div
      className={
        item.title === dietPortion.title
          ? "card flex flex-col items-center bg-green-100"
          : "card flex flex-col items-center bg-white"
      }
    >
      <div className="card-status-outer">
        <CircleSVG num={thenum} />
      </div>
      <p className="card-title">{item.title}</p>
      <p className="card-text">
        {item.description}
      </p>
      <button
        className="bg-green-600 focus:bg-green-800 focus:outline-none text-white font-medium py-2 px-4 rounded card-button"
        onClick={(e) => handleSelect(item)}
      >
        Select Diet
      </button>
    </div>
  );
};

export default DietPortionCard;