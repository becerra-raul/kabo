import React, { useState, useEffect } from "react";
import chickenIcon from "../../assets/images/recipe/chicken-recipe.png";
import lambIcon from "../../assets/images/recipe/lamb-recipe.png";
import turkeyIcon from "../../assets/images/recipe/turkey-recipe.png";
import beefIcon from "../../assets/images/recipe/beef-recipe.png";
import FoodCard from "./foodCard";

const MealPlanSelect = ({
  type,
  dog,
  index,
  recipes,
  selectedKibble,
  selectedDog,
  selectedKibbleRecipe,
  selectedCookedRecipes,
  handleSelectedCookedRecipes,
  toggleKibble,
  isKibble,
}) => {
  let icons = {
    chicken: chickenIcon,
    beef: beefIcon,
    lamb: lambIcon,
    turkey: turkeyIcon,
  };
  const [selected, isSelected] = useState(false);

  // useEffect(() => {
  //   let recipe_name = "";
  //   for (let [key, val] of Object.entries(food)) {
  //     if (key === "recipe" && type === "cooked") {
  //       recipe_name += `${val}_${key}`;
  //     }
  //   }

  //   if (type === "cooked") {
  //     console.log("food card", dog[recipe_name]);
  //   }
  // });

  const handleSelected = () => {
    isSelected(!selected);
  };

  return (
    <React.Fragment>
      {recipes &&
        recipes.map((food, idx) => (
          <FoodCard
            key={idx}
            type={type}
            dog={dog}
            index={index}
            food={food}
            icons={icons}
            selected={selected}
            selectedDog={selectedDog}
            handleSelected={handleSelected}
            handleSelectedCookedRecipes={handleSelectedCookedRecipes}
            selectedCookedRecipes={selectedCookedRecipes}
            kibbleRecipe={selectedKibbleRecipe}
            kibble={selectedKibble}
            toggleKibble={toggleKibble}
            isKibble={isKibble}
            recipe={food.recipe}
            keys={dog && Object.keys(dog).length > 0 ? Object.keys(dog) : []}
          />
        ))}
    </React.Fragment>
  );
};

export default MealPlanSelect;
