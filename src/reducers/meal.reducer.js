import { mealConstants } from "../constants";

const initialState = {
  updating_meal_plan: false,

  getting_diet_portion: false,
  daily_diet_portion_data: {},
};

export const meal = (state = initialState, action) => {
  switch (action.type) {
    case mealConstants.UPDATE_MEAL_PLAN:
      return {
        ...state,
        updating_meal_plan: true,
      };
    case mealConstants.UPDATE_MEAL_PLAN_SUCCESS:
      console.log("from reducer", action.payload);
      return {
        ...state,
        updating_meal_plan: false,
      };
    case mealConstants.UPDATE_MEAL_PLAN_FAILED:
      return {
        ...state,
        updating_meal_plan: false,
      };

    case mealConstants.GET_DAILY_DIET_PORTION:
      return {
        ...state,
        getting_diet_portion: true,
      };

    case mealConstants.GET_DAILY_DIET_PORTION_SUCCESS:
      return {
        ...state,
        getting_diet_portion: false,
        daily_diet_portion_data: action.payload,
      };

    case mealConstants.GET_DAILY_DIET_PORTION_FAILED:
      return {
        ...state,
        getting_diet_portion: false,
      };
    default:
      return state;
  }
};
