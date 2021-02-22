import React, { useState, useEffect } from "react";
import chickenIcon from "../../assets/images/recipe/chicken-recipe.png";
import lambIcon from "../../assets/images/recipe/lamb-recipe.png";
import turkeyIcon from "../../assets/images/recipe/turkey-recipe.png";
import beefIcon from "../../assets/images/recipe/beef-recipe.png";
import FoodCard from "./foodCard";

const MealPlanSelect = ({
  type,
  index,
  recipes,
  selectedKibble,
  selectedDog,
  selectedKibbleRecipe,
  selectedCookedRecipes,
  handleSelectedCookedRecipes,
  toggleKibble,
  selectedLength,
}) => {
  let icons = {
    chicken: chickenIcon,
    beef: beefIcon,
    lamb: lambIcon,
    turkey: turkeyIcon,
  };

  return (
    <React.Fragment>
      {recipes &&
        recipes.map((food, idx) => (
          <FoodCard
            key={idx}
            type={type}
            index={index}
            food={food}
            icons={icons}
            selectedDog={selectedDog}
            selected={type === 'kibble'
                ? selectedKibble.includes(food.recipe)
                : selectedCookedRecipes.includes(food.recipe)}
            selectedLength={selectedLength}
            selectCookedFood={handleSelectedCookedRecipes}
            selectedCookedRecipes={selectedCookedRecipes}
            selectKibbleRecipe={selectedKibbleRecipe}
            kibble={selectedKibble}
            toggleKibble={toggleKibble}
            recipe={food.recipe}
          />
        ))}
    </React.Fragment>
  );
};

export default MealPlanSelect;
