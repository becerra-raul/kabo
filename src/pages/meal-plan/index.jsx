import React, { Component } from "react";
import { connect } from "react-redux";
import {
  formValues,
  formValueSelector,
  getFormValues,
  reduxForm,
  Field,
} from "redux-form";
import { userActions, mealActions } from "../../actions";
import { Button } from "../../stories/Button";
import FreshFood from "../../components/meal-plan/fresh-food";
import KibbleSelect from "../../components/meal-plan/kibble";
import LoadingCircle from "../../components/partials/loading";
import MealPlanSelect from "../../components/meal-plan/meal-plan-select";
import RecipeSelection from "./RecipeSelection";
import DailyDietPortion from "./DailyDietPortion";
import DogSelector from "../../components/account/dog-selector";
import { useParams } from "react-router-dom";
import ConfirmMeal from "../../components/meal-plan/confirmCard";

class EditPlan extends Component {
  state = {
    next: false,
    previous: true,
    selectedBox: false,
    cookedRecipes: [],
    kibbleRecipes: [],
    isKibble: false,
    selectedPortion: false,
    estimate: false,
    dietPortion: {},
    dog: {},
    step: 0,
  };

  componentDidMount() {
    this.props.getSubscriptionData();
    this.props.getAccountData();
    this.props.getRecipeData();
  }

  componentDidUpdate(prevProps, prevState) {
    let index = parseInt(this.props.match.params.id);

    if (
      prevProps.user.dogs.length > 0 &&
      Object.keys(prevState.dog).length === 0
    ) {
      let currentdog = prevProps.user.dogs[index];
      let loadRecipes = []
      if (currentdog.chicken_recipe) {
        loadRecipes.push('chicken')
      }
      if (currentdog.beef_recipe) {
        loadRecipes.push('beef')

      }
      if (currentdog.lamb_recipe) {
        loadRecipes.push('lamb')
      }
      if (currentdog.turkey_recipe) {
        loadRecipes.push('turkey')
      }
      ///again not sure can be more then one kibble recipe
      this.setState({
        dog: prevProps.user.dogs[index],
        cookedRecipes: loadRecipes,
        kibbleRecipes: [currentdog.kibble_recipe] || []
      });
    }
  }

  selectedDog = (dog) => {
    this.setState({ dog });
  };

  toggleKibble = () => {
    this.setState({ isKibble: !this.state.isKibble });
  };

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  selectedDietPortion = (diet) => {
    console.log(diet)
    this.setState({ dietPortion: diet });
  };

  handleSelectedCookedRecipes = (food) => {
    const { cookedRecipes } = this.state;
    if (cookedRecipes && cookedRecipes.length > 0 && cookedRecipes.includes(food.recipe)) {
      let recipes = [...cookedRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ cookedRecipes: recipes });
      return;
    }
    this.setState({ cookedRecipes: [...cookedRecipes, food.recipe] });
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibbleRecipes } = this.state;
    if (kibbleRecipes.length > 0 && kibbleRecipes.includes(food.recipe)) {
      let recipes = [...kibbleRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ kibbleRecipes: [recipes] });
      return;
    }
    this.setState({ kibbleRecipes: [food.recipe] });
  };

  handleNext = () => {
    if (this.state.step === 1) {
      const { cookedRecipes, kibbleRecipes, dietPortion, dog } = this.state;
      const data = {
        dog_id: dog.id,
        cooked_portion: dietPortion.cooked_portion || null,
        kibble_portion: dietPortion.kibble_portion || null,
        portion_adjusment: dietPortion.portion_adjusment || null
      };
      if (kibbleRecipes && kibbleRecipes.length > 0) {
        data.kibble_recipe = kibbleRecipes[0];
      }
      for (let item of cookedRecipes) {
        data[`${item}_recipe`] = true;
      }
      console.log(data)
      this.props.getSubscriptionEstimate(data)
    }
    this.setState({ step: this.state.step + 1 });
  };

  handlePrevious = () => {
    this.setState({ step: this.state.step - 1 });
  };

  handleEstimate = () => {
    this.setState({ previous: false, next: false, estimate: true });
  };

  handleMealUpdate = () => {
    const { cookedRecipes, kibbleRecipes, dietPortion, dog } = this.state;
    const data = {
      dog_id: dog.id,
      cooked_portion: dietPortion.cooked_portion || null,
      kibble_portion: dietPortion.kibble_portion || null,
      portion_adjusment: dietPortion.portion_adjusment || null
    };
    ///not sure what to do if selected kibbleRecipes more than one
    if (kibbleRecipes && kibbleRecipes.length > 0) {
      data.kibble_recipe = kibbleRecipes[0];
    }
    for (let item of cookedRecipes) {
      data[`${item}_recipe`] = true;
    }
    this.props.updateMealPlan(data);
  };

  render() {
    const { user, meal, getDailyDietPortion } = this.props;
    const { cookedRecipes, kibbleRecipes, dog, dietPortion, index, step } = this.state;

    if (user.subLoading) return <LoadingCircle />
    let filteredKibble = (kibbleRecipes[0] === null || !kibbleRecipes) ? 0 : kibbleRecipes.length
    let filteredCooked = (cookedRecipes[0] === null || !cookedRecipes) ? 0 : cookedRecipes.length

    ///checking selected plans length.
    console.log(kibbleRecipes, cookedRecipes)
    const selectedLength = filteredCooked + filteredKibble
    // console.log(selectedLength)
    return (
      <React.Fragment>
        { step == 0 && (
          <RecipeSelection
            user={user}
            index={this.props.match.params.id}
            selectedDog={this.selectedDog}
            handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
            selectedCookedRecipes={cookedRecipes}
            handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
            selectedKibble={kibbleRecipes}
            selectedLength={selectedLength}
            toggleKibble={this.toggleKibble}
            isKibble={this.state.isKibble}
          />
        )
        }
        {
          step > 0 && (
            <DailyDietPortion
              meal={meal}
              dog={dog}
              cookedRecipes={cookedRecipes}
              dietPortion={this.state.dietPortion}
              selectedPortion={this.state.selectedPortion}
              togglePortion={this.togglePortion}
              selectedDietPortion={this.selectedDietPortion}
              getDailyDietPortion={getDailyDietPortion}
              kibbleRecipes={kibbleRecipes}
            />
          )
        }
        {
          step > 1 && (
            <ConfirmMeal
              dog={dog}
              user={user}
              open={true}
              cookedRecipes={cookedRecipes}
              index={this.props.match.params.id}
              subs={user.subscriptions}
              kibble={this.state.kibbleRecipes}
              onClose={this.handlePrevious}
              dietPortion={this.state.dietPortion}
              estimate={user.estimate}
              onConfirm={(e) => this.handleMealUpdate(e)}
            />)
        }


        <div className="w-full flex flex-col py-3 bg-white items-center fixed bottom-0">
          <div className="inline-flex">
            {step !== 0 && (
              <button
                onClick={this.handlePrevious}
                className="text-green-600 mr-2 focus:outline-none"
              >
                Previous
              </button>)
            }
            {step == 0 && (
              <button
                onClick={this.handleNext}
                disabled={selectedLength == 0}
                className={
                  selectedLength == 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            )}
            {step > 0 && (
              <button
                onClick={this.handleNext}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  cookedRecipes.length === 0 && kibbleRecipes.length === 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            )}
            {this.state.estimate && (
              <button
                type="button"
                onClick={(e) => this.handleMealUpdate(e)}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  Object.keys(dietPortion).length <= 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                }
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </React.Fragment >
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
  updateMealPlan: (payload) => dispatch(mealActions.updateMealPlan(payload)),
  getDailyDietPortion: (payload) =>
    dispatch(mealActions.getDailyDietPortion(payload)),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getSubscriptionEstimate: (data) => dispatch(userActions.getSubscriptionEstimate(data)),
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    meal: state.meal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
