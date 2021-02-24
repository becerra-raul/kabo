import { takeLatest, call, put, all } from 'redux-saga/effects';

import { userService } from '../services';
import { userConstants, otherConstants } from '../constants';
import {userActions} from "../actions/user.action";

function* getAccountDataSaga() {
  try {
    const payload = yield call(userService.getAccountData);
    yield put({ type: userConstants.ACCOUNT_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* getSubscriptionDataSaga() {
  try {
    const payload = yield call(userService.getSubscriptionData);
    yield put({ type: userConstants.SUBSCRIPTION_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* getSubscriptionEstimateSaga(action) {
  try {
    const payload = yield call(
      userService.getSubscriptionEstimate,
      action.payload
    );
    yield put({ type: userConstants.ESTIMATE_LOADED, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* getBreedDataSaga() {
  try {
    const payload = yield call(userService.getBreedData);
    yield put({ type: userConstants.BREED_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* getRecipeDataSaga() {
  try {
    const payload = yield call(userService.getRecipeData);
    yield put({ type: userConstants.RECIPE_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* getOrderDataSaga() {
  try {
    const payload = yield call(userService.getOrderData);
    yield put({ type: userConstants.ORDER_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* cancelSubscriptionSaga(action) {
  try {
    const payload = yield call(userService.cancelSubscription, action.payload);
    yield all([
      put({ type: userConstants.CANCEL_SUBSCRIPTION_SUCCESS, payload }),
      put(userActions.setUserLoading(userConstants.CANCEL_SUBSCRIPTION_REQUESTED, false))
    ]);
  } catch (e) {
    yield all([
      put({ type: otherConstants.REQUEST_ERROR, payload: e }),
      put(userActions.setUserLoading(userConstants.CANCEL_SUBSCRIPTION_REQUESTED, false)),
    ]);
  }
}

function* pauseSubscriptionSaga(action) {
  try {
    const payload = yield call(userService.pauseSubscription, action.payload);
    yield put({ type: userConstants.PAUSE_SUBSCRIPTION_SUCCESS, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* unpauseSubscriptionSaga(action) {
  try {
    const payload = yield call(userService.unpauseSubscription, action.payload);
    yield put({ type: userConstants.UNPAUSE_SUBSCRIPTION_SUCCESS, payload });
  } catch (e) {
    yield put({ type: otherConstants.REQUEST_ERROR, payload: e });
  }
}

function* updateDeliveryAddressSaga(action) {
  try {
    const payload = yield call(
      userService.updateDeliveryAddress,
      action.payload
    );
    yield put({ type: userConstants.DELIVERY_UPDATE_SUCCESS, payload });
  } catch (e) {
    yield put({ type: userConstants.DELIVERY_UPDATE_FAILURE, payload: e });
  }
}

function* updateEmailPhoneSaga(action) {
  try {
    const payload = yield call(userService.updatePhoneEmail, action.payload);
    yield put({ type: userConstants.UPDATE_USER_PHONE_EMAIL_SUCCESS, payload });
  } catch (e) {
    yield put({
      type: userConstants.UPDATE_USER_PHONE_EMAIL_FAILURE,
      payload: e,
    });
  }
}

function* updateDeliveryFrequencySaga(action) {
  try {
    const payload = yield call(
      userService.updateDeliveryFrequency,
      action.payload
    );
    yield put({
      type: userConstants.UPDATE_DELIVERY_FREQUENCY_SUCCESS,
      payload,
    });
  } catch (e) {
    yield put({
      type: userConstants.UPDATE_DELIVERY_FREQUENCY_FAILURE,
      payload: e,
    });
  }
}

function* updatePassword(action) {
  try {
    const payload = yield call(userService.updatePwd, action.payload);
    yield put({ type: userConstants.UPDATE_PWD_SUCCESS, payload });
  } catch (e) {
    yield put({ type: userConstants.UPDATE_PWD_FAILURE, payload: e });
  }
}

function* openUpdatePaymentModal(action) {
  yield put({
    type: userConstants.OPEN_UPDATE_PAYMENT_MODAL_SUCCESS,
    payload: action.payload,
  });
}

function* setBillingAddress(action) {
  yield put({
    type: userConstants.SET_BILLING_ADDRESS_SUCCESS,
    payload: action.payload,
  });
}

function* updatePaymentMethod(action) {
  try {
    const payload = yield call(userService.updatePaymentMethod, action.payload);
    yield put({ type: userConstants.UPDATE_PAYMENT_METHOD_SUCCESS, payload });
  } catch (error) {
    yield put({ type: userConstants.UPDATE_PAYMENT_METHOD_FAILED, error });
  }
}

function* openSkipDeliveryModal(action) {
  yield put({
    type: userConstants.OPEN_SKIP_DELIVERY_MODAL_SUCCESS,
    payload: action.payload,
  });
}

function* skipDogDelivery(action) {
  try {
    const payload = yield call(userService.skipDogDelivery, action.payload);
    yield put({ type: userConstants.SKIP_DOG_DELIVERY_SUCCESS, payload });
  } catch (error) {
    yield put({ type: userConstants.SKIP_DOG_DELIVERY_FAILED, payload: error });
  }
}
export default function* user() {
  yield takeLatest(userConstants.ACCOUNT_DATA_REQUESTED, getAccountDataSaga);
  yield takeLatest(userConstants.RECIPE_DATA_REQUESTED, getRecipeDataSaga);
  yield takeLatest(userConstants.BREED_DATA_REQUESTED, getBreedDataSaga);
  yield takeLatest(
    userConstants.SUBSCRIPTION_DATA_REQUESTED,
    getSubscriptionDataSaga
  );
  yield takeLatest(
    userConstants.ESTIMATE_REQUESTED,
    getSubscriptionEstimateSaga
  );
  yield takeLatest(
    userConstants.CANCEL_SUBSCRIPTION_REQUESTED,
    cancelSubscriptionSaga
  );
  yield takeLatest(
    userConstants.PAUSE_SUBSCRIPTION_REQUESTED,
    pauseSubscriptionSaga
  );
  yield takeLatest(
    userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED,
    unpauseSubscriptionSaga
  );
  yield takeLatest(
    userConstants.DELIVERY_UPDATE_REQUESTED,
    updateDeliveryAddressSaga
  );
  yield takeLatest(userConstants.UPDATE_USER_PHONE_EMAIL, updateEmailPhoneSaga);
  yield takeLatest(userConstants.ORDER_DATA_REQUESTED, getOrderDataSaga);
  yield takeLatest(userConstants.UPDATE_PWD_REQUESTED, updatePassword);

  yield takeLatest(userConstants.SET_BILLING_ADDRESS, setBillingAddress);
  yield takeLatest(
    userConstants.OPEN_UPDATE_PAYMENT_MODAL,
    openUpdatePaymentModal
  );
  yield takeLatest(userConstants.UPDATE_PAYMENT_METHOD, updatePaymentMethod);
  yield takeLatest(
    userConstants.UPDATE_DELIVERY_FREQUENCY_REQUESTED,
    updateDeliveryFrequencySaga
  );

  yield takeLatest(
    userConstants.OPEN_SKIP_DELIVERY_MODAL,
    openSkipDeliveryModal
  );

  yield takeLatest(userConstants.SKIP_DOG_DELIVERY, skipDogDelivery);
}
