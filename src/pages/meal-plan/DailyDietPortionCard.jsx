import React from "react";
import { CircleSVG } from "../../components/meal-plan/circle";



const DietPortionCard = ({ item, handleSelect, dietPortion }) => {
  let thenum = item.title.match(/\d+/)[0]
  thenum = parseInt(thenum)
  if (thenum < 24) {
    thenum = 101
  }
  return (
    <button
      onClick={(e) => handleSelect(item)}
      className={
        item.title === dietPortion.title
          ? " flex flex-col w-full pt-4 px-4 pb-16 items-center bg-green-100 font-messina relative rounded-lg border border-gray-200"
          : " flex flex-col w-full  p-2 items-center bg-white font-messina relative rounded-lg border border-gray-200"
      }
    >
      <div className="w-2/5 relative">
        {thenum === 100 && <img src='/diet-logo.png' className="absolute w-3/4" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}

        {thenum > 100 && <img src='/plus.png' className="absolute h-1/3" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
        <CircleSVG num={thenum} />
      </div>
      <p className="font-messina mt-1">{item.title}</p>
    </button>
  );
};

export default DietPortionCard;