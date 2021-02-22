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
  kibbleRecipes
}) => {
  console.log(kibbleRecipes)
  useEffect(() => {
    const data = {
      cooked_recipes: cookedRecipes,
      dog_id: dog.id,
      kibble_recipe: kibbleRecipes[0]
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
      <div className="w-full flex flex-col pt-9 pb-20 items-center bg-recipeGray">
        <div className="container flex flex-col items-center">

          <div className="mb-3 text-xl font-medium">Choose the Daily Portion</div>
          <div className="p-5 md:w-1/2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DailyDietPortion;
