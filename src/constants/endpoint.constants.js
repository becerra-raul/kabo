// src/constants/endpoint.constants.js

const appDomain = process.env.REACT_APP_DOMAIN;
const apiVersion = process.env.REACT_APP_API_VERSION;

export const endpointConstants = {
  LOGIN: `${appDomain}/login`,
  GET_ACCOUNT_DATA: `${appDomain}/${apiVersion}/user/details`,
  PAUSE_SUBSCRIPTION: `${appDomain}/${apiVersion}/user/subscriptions/pause`,
  GET_SUBSCRIPTION_DATA: `${appDomain}/${apiVersion}/user/subscriptions`,
  CANCEL_SUBSCRIPTION: `${appDomain}/${apiVersion}/user/subscriptions/cancel`,
  GET_RECIPE_DATA: `${appDomain}/${apiVersion}/onboarding/recipes`,
  UPDATE_MEAL_PLAN: `${appDomain}/${apiVersion}/user/subscriptions/meal_plan`,
  GET_BREEDS: `${appDomain}/${apiVersion}/onboarding/signup?step=start`,
  GET_ORDER_DATA: `${appDomain}/${apiVersion}/user/orders`,
  UPDATE_DELIVERY_ADDRESS: `${appDomain}/${apiVersion}/user/delivery_address`,
  DAILY_DIET_PORTION: `${appDomain}/${apiVersion}/user/subscriptions/portions`,
  UPDATE_PASSWORD: `${appDomain}/${apiVersion}/user/password`,
  UPDATE_PAYMENT_METHOD: `${appDomain}/${apiVersion}/user/payment_method`,
  GET_SUBSCRIPTION_ESTIMATE: `${appDomain}/${apiVersion}/user/subscriptions/meal_plan/estimate`,
  UPDATE_DELIVERY_FREQUENCY: `${appDomain}/${apiVersion}/user/delivery_frequency`,
  SKIP_DOG_DELIVERY: `${appDomain}/${apiVersion}/user/subscriptions/skip_delivery`,
  UPDATE_PHONE_EMAIL:`${appDomain}/${apiVersion}/user/contact`
};
