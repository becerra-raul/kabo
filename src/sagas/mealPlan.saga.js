import { takeLatest, call, put } from 'redux-saga/effects';

import { mealService } from '../services';
import { mealConstants } from '../constants';

function* updateMealPlanSaga(action) {
  try {
    const payload = yield call(mealService.updateMealPlan, action.payload);
    yield put({ type: mealConstants.UPDATE_MEAL_PLAN_SUCCESS, payload });
  } catch (e) {
    yield put({ type: mealConstants.UPDATE_MEAL_PLAN_FAILED, payload: e });
  }
}

function* getDailyDietPortion(action) {
  try {
    const payload = yield call(mealService.getDailyDietPortion, action.payload);
    yield put({ type: mealConstants.GET_DAILY_DIET_PORTION_SUCCESS, payload });
  } catch (e) {
    yield put({
      type: mealConstants.GET_DAILY_DIET_PORTION_FAILED,
      payload: e,
    });
  }
}
export default function* meal() {
  yield takeLatest(mealConstants.UPDATE_MEAL_PLAN, updateMealPlanSaga);
  yield takeLatest(mealConstants.GET_DAILY_DIET_PORTION, getDailyDietPortion);
}
