import React from "react";

const MealCard = () => {
  return (
    <React.Fragment>
      <div className="py-8 px-5 relative border-r border-l rounded-b-xl border-b border-gray-300">
        <div className="text-black font-messina bg-promptYellow p-6 rounded-xl">
          <div className="font-semibold">Reminder about Deliveries</div>
          <div className="text-black text-sm font-normal mt-3">
            Keep in mind changes you make to your delivery amount, frequency and
            next delivery date will only affect your next delivery
          </div>
          <div className="text-primary font-semibold m-3">
            Learn more about our deliveries
          </div>
        </div>
        <form>
          <div className="text-lightGrey font-messina w-100 text-xs leading-4 font-semibold mt-5">
            Amount of Food Per dog
          </div>

          <div className="text-lightGrey font-messina w-100 text-xs leading-4 font-semibold mt-5">
            How Often?
          </div>

          <div className="text-lightGrey font-messina w-100 text-xs leading-4 font-semibold mt-5">
            Next Delivery Date
          </div>

          <button
            type="submit"
            className="bg-primary text-white rounded-xl font-semibold py-2.5 px-6 mt-8"
          >
            Save Changes
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MealCard;