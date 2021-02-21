import { mealConstants } from '../constants';

function updateMealPlan(data) {
  return {
    type: mealConstants.UPDATE_MEAL_PLAN,
    payload: data,
  };
}

function getDailyDietPortion(data) {
  return {
    type: mealConstants.GET_DAILY_DIET_PORTION,
    payload: data,
  };
}

export const mealActions = {
  updateMealPlan,
  getDailyDietPortion,
};
