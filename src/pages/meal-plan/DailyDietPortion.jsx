import React, { useEffect } from "react";
import LoadingCircle from "../../components/partials/loading";
import DietPortionCard from "./DailyDietPortionCard.jsx";
import "./style.css";

const DailyDietPortion = ({
  meal,
  dog,
  dietPortion,
  cookedRecipes,
  selectedDietPortion,
  getDailyDietPortion,
}) => {
  useEffect(() => {
    const data = {
      cooked_recipes: cookedRecipes,
      dog_id: dog.id,
    };
    getDailyDietPortion(data);
    // console.log("Daily Diet Portion is loaded");
  }, []);

  const handleSelect = (item) => {
    selectedDietPortion(item);
  };

  // console.log(cookedRecipes,)

  return (
    <React.Fragment>
      <div className="w-full flex flex-col py-9 items-center bg-recipeGray">
        <div className="mb-3 text-xl font-medium">Choose the Daily Portion</div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          {meal.getting_diet_portion && <LoadingCircle />}
          {meal &&
            meal.daily_diet_portion_data &&
            meal.daily_diet_portion_data.portions &&
            meal.daily_diet_portion_data.portions.map((item, idx) => (
              <DietPortionCard
                key={idx}
                item={item}
                handleSelect={handleSelect}
                dietPortion={dietPortion}
              />
            ))}

          {/* <div className="card flex flex-col items-center">
            <div className="card-status-outer">
              <div className="card-status-inner"></div>
            </div>
            <p className="card-title">{diet.is50}% Kabo Diet</p>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <button
              className="bg-green-600 focus:bg-green-800 focus:outline-none text-white font-medium py-2 px-4 rounded card-button"
              value={diet.is25}
              onClick={(e) => handleSelect(e.target.value)}
            >
              Select Diet
            </button>
          </div>
          <div className="card flex flex-col items-center">
            <div className="card-status-outer">
              <div className="card-status-inner"></div>
            </div>
            <p className="card-title">{diet.is75}% Kabo Diet</p>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <button
              className="bg-green-600 focus:bg-green-800 focus:outline-none text-white font-medium py-2 px-4 rounded card-button"
              value={diet.is75}
              onClick={(e) => handleSelect(e.target.value)}
            >
              Select Diet
            </button>
          </div>
          <div className="card flex flex-col items-center">
            <div className="card-status-outer">
              <div className="card-status-inner"></div>
            </div>
            <p className="card-title">{diet.is100}% Kabo Diet</p>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <button
              className="bg-green-600 focus:bg-green-800 focus:outline-none text-white font-medium py-2 px-4 rounded card-button"
              value={diet.is100}
              onClick={(e) => handleSelect(e.target.value)}
            >
              Select Diet
            </button>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default DailyDietPortion;
