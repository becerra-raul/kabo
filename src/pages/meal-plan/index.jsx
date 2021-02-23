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
import ConfirmMeal from "../../components/meal-plan/confirm-card";
import SelectedRecipes from "./SelectedRecipes";
import FreshOrKibble from "../../components/meal-plan/fresh-kibble-selector";
import Loader from "../../loaders/mealPlan"

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
    dirty: false,
    showKibble: true,
    showCooked: true,
  };

  componentDidMount() {
    this.props.getSubscriptionData();
    this.props.getAccountData();
    this.props.getRecipeData();
  }

  componentDidUpdate(prevProps, prevState, snap) {
    let index = parseInt(this.props.match.params.id);

    if (
      !prevProps.user.subLoading &&
      prevProps.user.dogs.length > 0 &&
      !prevState.dog.name
      // Object.keys(prevState.dog).length === 0
    ) {
      let currentdog = prevProps.user.dogs[index];
      this.setState({ dog: currentdog })
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
        cookedRecipes: loadRecipes,
        kibbleRecipes: [currentdog.kibble_recipe] || []
      });
    }
  }

  selectedDog = (dog) => {
    this.setState({ dog });
  };

  displayKibble = (state) => {
    this.setState({ showKibble: state })
  }

  displayCooked = (state) => {
    this.setState({ showCooked: state })
  }

  toggleKibble = () => {
    this.setState({ isKibble: !this.state.isKibble });
  };

  toggleDirty = () => {
    this.setState({ dirty: true })
  }

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  selectedDietPortion = (diet) => {
    this.setState({ dietPortion: diet, step: 2 });
    this.handleNext()
  };

  handleSelectedCookedRecipes = (food) => {
    const { cookedRecipes } = this.state;
    if (cookedRecipes && cookedRecipes.length > 0 && cookedRecipes.includes(food.recipe)) {
      let recipes = [...cookedRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ cookedRecipes: recipes, step: 1, dirty: true });
      this.handleNext()
      return;
    }
    this.setState({
      cookedRecipes: [...cookedRecipes, food.recipe],
      dirty: true,
      step: 1,
    });
    this.handleNext()
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibbleRecipes } = this.state;
    if (kibbleRecipes.length > 0 && kibbleRecipes.includes(food.recipe)) {
      let recipes = [...kibbleRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ kibbleRecipes: [], step: 1, dirty: true });
      this.handleNext()
      return;
    }
    this.setState({
      kibbleRecipes: [food.recipe],
      step: 1,
      dirty: true
    });
    this.handleNext()
  };

  handleNext = () => {
    if (this.state.step === 1) {
      const { cookedRecipes, kibbleRecipes, dietPortion, dog } = this.state;
      console.log(kibbleRecipes)
      const data = {
        dog_id: dog.id,
        cooked_portion: dietPortion.cooked_portion,
        kibble_portion: dietPortion.kibble_portion || null,
        chicken_recipe: false,
        turkey_recipe: false,
        lamb_recipe: false,
        beef_recipe: false,
        kibble_recipe: null,
        portion_adjusment: dietPortion.portion_adjusment || null
      };
      let kibbleNotNull = kibbleRecipes.some(function (el) {
        return el !== null;
      })
      if (kibbleNotNull) {
        data.kibble_recipe = kibbleRecipes[0];
      }
      for (let item of cookedRecipes) {
        data[`${item}_recipe`] = true;
      }
      this.props.getSubscriptionEstimate(data)
    }
    // this.setState({ step: this.state.step + 1 });
  };

  handlePrevious = () => {
    this.setState({ step: this.state.step - 1 });
  };

  handleEstimate = () => {
    this.setState({ previous: false, next: false, estimate: true });
  };

  handleMealUpdate = () => {
    const { cookedRecipes, kibbleRecipes, dietPortion, dog, showCooked, showKibble } = this.state;
    const data = {
      dog_id: dog.id,
      cooked_portion: dietPortion.cooked_portion || null,
      kibble_portion: null,
      portion_adjusment: dietPortion.portion_adjusment || null,
      chicken_recipe: false,
      turkey_recipe: false,
      lamb_recipe: false,
      beef_recipe: false,
      kibble_recipe: null,
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
    const { cookedRecipes, kibbleRecipes, dog, step, dirty, showCooked, showKibble } = this.state;

    if (user.subLoading) return <Loader />
    let filteredKibble = (kibbleRecipes[0] === null || !kibbleRecipes) ? 0 : kibbleRecipes.length
    let filteredCooked = (cookedRecipes[0] === null || !cookedRecipes) ? 0 : cookedRecipes.length

    ///checking selected plans length.
    const selectedLength = filteredCooked + filteredKibble

    if (selectedLength === 0 && !dirty) this.forceUpdate()
    return (
      <div className="bg-recipeGray">
        <div className="font-messina text-center font-bold mb-4 text-black bg-recipeGray">
          Choose 1 or 2 recipes per Order for {dog && dog.name}

        </div>
        <div className="w-2/3 m-auto">
          <FreshOrKibble
            showCooked={showCooked}
            showKibble={showKibble}
            setKibble={this.displayKibble}
            setFresh={this.displayCooked}
          />
        </div>
        <div className="grid grid-cols-2 ">
          <RecipeSelection
            user={user}
            showCooked={showCooked}
            showKibble={showKibble}
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
          <div>
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
            <SelectedRecipes
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
          </div>
        </div>
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
      </div >
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
