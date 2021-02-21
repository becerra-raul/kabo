import { request } from "../utils";
import { endpointConstants } from "../constants";

const updateMealPlan = async (data) => {
  const requestOptions = request.options(
    "PUT",
    JSON.stringify(data),
    true,
    true
  );

  return fetch(endpointConstants.UPDATE_MEAL_PLAN, requestOptions)
    .then(request.handleResponse)
    .then((res) => res)
    .then(() => (window.location = "/"));
};

const getDailyDietPortion = async (data) => {
  const requestOptions = request.options(
    "POST",
    JSON.stringify(data),
    true,
    true
  );

  return fetch(endpointConstants.DAILY_DIET_PORTION, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

export const mealService = {
  updateMealPlan,
  getDailyDietPortion,
};
