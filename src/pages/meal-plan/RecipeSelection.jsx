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
      <div className="w-full flex flex-col py-9 items-center bg-recipeGray">
        <div className="container flex flex-col items-center">
          <div className="font-messina text-center font-bold mb-4 text-black">
            Choose up to 2 recipes for{" "}
            {user.dogs && user.dogs.length > 0 && user.dogs[index].name}
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 w-full md:w-4/5 gap-10">
            <div >
              {!user.cooked_recipes ? (
                <LoadingCircle />
              ) : (
                  <>
                    <div className="mb-6 text-xl">Fresh Food</div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
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
                    </div>
                  </>
                )}
            </div>
            <div>
              {!user.kibble_recipes ? (
                <LoadingCircle />
              ) : (
                  <>
                    <div className="mb-6 text-xl">Kibble</div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
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
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
