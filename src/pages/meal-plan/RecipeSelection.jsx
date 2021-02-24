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
      <div className="md:w-2/5 w-full flex flex-col lg:py-9 items-center bg-recipeGray">
        <div className="w-full">
          {showCooked && (
            <div>
              {!user.cooked_recipes ? (
                <LoadingCircle />
              ) : (
                  showCooked && (
                    <>
                      <div className="mb-6 text-xl text-center md:text-left">Fresh Food</div>
                      <div className="grid md:block w-11/12 mx-auto md:w-full grid-cols-2 gap-6">
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
                    </>
                  )
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
                      <div className="mb-6 text-xl text-center md:text-left">Kibble</div>
                      <div className="grid md:block w-11/12 mx-auto md:w-full grid-cols-2 gap-6 ">
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
                    </>
                  )
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
