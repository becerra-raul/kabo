import React, { Component } from "react";
import LoadingCircle from "../../components/partials/loading";
import MealPlanSelect from "../../components/meal-plan/meal-plan-select";

class RecipeSelection extends Component {
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
      showCooked,
      showKibble
    } = this.props;
    return (
      <div className="w-full flex flex-col py-9 items-center bg-recipeGray">
        <div className="container flex flex-col items-center">
          <div className=" grid grid-cols-1 w-full md:w-4/5 gap-10">
            {showCooked && (
              <div >
                {!user.cooked_recipes ? (
                  <LoadingCircle />
                ) : (
                    showCooked && (
                      <>
                        <div className="mb-6 text-xl">Fresh Food</div>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                          <MealPlanSelect
                            type="cooked"
                            index={index}
                            recipes={user.cooked_recipes}
                            handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                            selectedCookedRecipes={selectedCookedRecipes}
                            selectedKibble={selectedKibble}
                            selectedDog={selectedDog}
                            selectedLength={selectedLength}
                          />
                        </div>
                      </>)

                  )}
              </div>
            )}
            {showKibble && (
              <div>
                {!user.kibble_recipes ? (
                  <LoadingCircle />
                ) : (
                    showKibble && (
                      <>
                        <div className="mb-6 text-xl">Kibble</div>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                          <MealPlanSelect
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
                      </>)
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
