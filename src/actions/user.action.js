import { userConstants } from "../constants";

const getAccountData = () => ({ type: userConstants.ACCOUNT_DATA_REQUESTED });

const getRecipeData = () => ({ type: userConstants.RECIPE_DATA_REQUESTED });

const getSubscriptionData = () => ({
  type: userConstants.SUBSCRIPTION_DATA_REQUESTED,
});

const getOrderData = (data) => ({
  type: userConstants.ORDER_DATA_REQUESTED,
  payload: data,
});

const getBreedData = () => ({ type: userConstants.BREED_DATA_REQUESTED });

const pauseSubscription = (data) => ({
  type: userConstants.PAUSE_SUBSCRIPTION_REQUESTED,
  payload: data,
});

const getSubscriptionEstimate = (data) => ({
  type: userConstants.ESTIMATE_REQUESTED,
  payload: data,
});

const unpauseSubscription = (data) => ({
  type: userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED,
  payload: data,
});

const cancelSubscription = (userID) => ({
  type: userConstants.CANCEL_SUBSCRIPTION_REQUESTED,
  payload: userID,
});

const updateDeliveryAddress = (data) => ({
  type: userConstants.DELIVERY_UPDATE_REQUESTED,
  payload: data,
});

const updateDeliveryFrequency = (data) => ({
  type: userConstants.UPDATE_DELIVERY_FREQUENCY_REQUESTED,
  payload: data,
});

const updatePwd = (data) => ({
  type: userConstants.UPDATE_PWD_REQUESTED,
  payload: data,
});

const clearPwdUpdateAlert = () => ({
  type: userConstants.UPDATE_PWD_ALERT_CLEAR,
});

const openUpdatePaymentModal = (isOpen) => ({
  type: userConstants.OPEN_UPDATE_PAYMENT_MODAL,
  payload: isOpen,
});

const setBillingAddress = (data) => ({
  type: userConstants.SET_BILLING_ADDRESS,
  payload: data,
});

const updatePaymentMethod = (data) => ({
  type: userConstants.UPDATE_PAYMENT_METHOD,
  payload: data,
});

const  updateUserPhoneEmail = (data) => ({
  type: userConstants.UPDATE_USER_PHONE_EMAIL,
  payload: data,
});


const openSkipDeliveryModal = (isOpen) => ({
  type: userConstants.OPEN_SKIP_DELIVERY_MODAL,
  payload: isOpen,
});

const skipDogDelivery = (id) => ({
  type: userConstants.SKIP_DOG_DELIVERY,
  payload: id,
});

export const userActions = {
  getAccountData,
  pauseSubscription,
  unpauseSubscription,
  cancelSubscription,
  getRecipeData,
  getSubscriptionData,
  getBreedData,
  getOrderData,
  updateDeliveryAddress,
  updatePwd,
  clearPwdUpdateAlert,
  openUpdatePaymentModal,
  setBillingAddress,
  updatePaymentMethod,
  getSubscriptionEstimate,
  updateDeliveryFrequency,
  openSkipDeliveryModal,
  skipDogDelivery,
  updateUserPhoneEmail
};
