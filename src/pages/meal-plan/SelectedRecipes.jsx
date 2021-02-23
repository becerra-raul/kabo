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
      <div className="w-full flex flex-col py-9 items-center bg-recipeGray">
        <div className="container flex flex-col items-center">
          <div className=" grid grid-cols-1 w-full md:w-4/5 gap-10">
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
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedRecipes;
