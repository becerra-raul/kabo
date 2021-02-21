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
      kibble,
      isKibble,
      toggleKibble,
      selectedDog,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedCookedRecipes,
    } = this.props;
    return (
      <>
        <div className="w-full flex flex-col py-9 items-center bg-recipeGray">
          <div className="font-messina font-bold mb-4 text-black">
            Choose up to 2 recipes for{" "}
            {user.dogs && user.dogs.length > 0 && user.dogs[index].name}
          </div>

          <div className="p-5 grid grid-cols-1 w-full grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
            <div>
              {!user.cooked_recipes ? (
                <LoadingCircle />
              ) : (
                  <>
                    <div className="mb-6 text-xl">Fresh Food</div>
                    <MealPlanSelect
                      type="cooked"
                      dog={user.dogs[index]}
                      index={index}
                      recipes={user.cooked_recipes}
                      handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                      selectedCookedRecipes={selectedCookedRecipes}
                      selectedKibble={kibble}
                      selectedDog={selectedDog}
                    />
                  </>
                )}
            </div>
            <div>
              {!user.kibble_recipes ? (
                <LoadingCircle />
              ) : (
                  <>
                    <div className="mb-6 text-xl">Kibble</div>
                    <MealPlanSelect
                      type="kibble"
                      dog={user.dogs[index]}
                      recipes={user.kibble_recipes}
                      selectedKibbleRecipe={handleSelectedKibbleRecipe}
                      selectedKibble={kibble}
                      selectedCookedRecipes={selectedCookedRecipes}
                      toggleKibble={toggleKibble}
                      isKibble={isKibble}
                      selectedDog={selectedDog}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RecipeSelection;
