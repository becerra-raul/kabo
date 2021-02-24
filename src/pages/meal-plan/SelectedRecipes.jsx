import React, { Component } from "react";
import LoadingCircle from "../../components/partials/loading";
import MealPlanSelect from "../../components/meal-plan/meal-plan-select";
import DisplaySelected from "../../components/meal-plan/display-selected";

class SelectedRecipes extends Component {
  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
  };
  render() {
    const {
      user,
      index,
      selectedKibble,
      isKibble,
      toggleKibble,
      selectedDog,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedCookedRecipes,
      selectedLength,
    } = this.props;
    return (
      <div className="flex flex-col py-9 items-center bg-recipeGray">
        <div className="container flex flex-col  w-11/12 mx-auto lg:w-full">
          <div className=" grid grid-cols-1 w-full w-4/5 md:w-full gap-10">
            <div >
              <DisplaySelected
                type="cooked"
                index={index}
                recipes={user.cooked_recipes}
                handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                selectedCookedRecipes={selectedCookedRecipes}
                selectedKibble={selectedKibble}
                selectedDog={selectedDog}
                selectedLength={selectedLength}
              />
              <DisplaySelected
                type="kibble"
                recipes={user.kibble_recipes}
                selectedKibbleRecipe={handleSelectedKibbleRecipe}
                selectedKibble={selectedKibble}
                selectedCookedRecipes={selectedCookedRecipes}
                toggleKibble={toggleKibble}
                isKibble={isKibble}
                selectedDog={selectedDog}
                selectedLength={selectedLength}
              />
            </div>
            <button class="rounded-lg bg-green-700 border border-green-700 hover:border-transparent focus:outline-none text-white text-sm md:text-base font-bold p-1 md:py-2 md:px-5  rounded mt-2 md:mt-0">Confirm updates</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedRecipes;
