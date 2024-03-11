import { call, put, takeEvery } from "redux-saga/effects";

import { IPucharse } from "../../../types/Models";
import pucharseApi from "../../../services/pucharseApi";
import {
  handleGetListPucharseFail,
  handleGetPucharse,
  handleGetPucharseSuccess,
  handlePostPucharse,
} from "../Reducers/pucharseSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handlePucharseSaga() {
  try {
    const res: IPucharse[] = yield call(pucharseApi.getAllPucharses);

    yield put(handleGetPucharseSuccess(res));
  } catch (error) {
    yield put(handleGetListPucharseFail());
  }
}
function* handlePostPucharseSaga(action: PayloadAction<IPucharse>) {
  try {
    const res: IPucharse[] = yield call(() =>
      pucharseApi.postPurchase(action.payload)
    );

    yield put(handleGetPucharseSuccess(res));
  } catch (error) {
    yield put(handleGetListPucharseFail());
  }
}
function* pucharseSaga() {
  yield takeEvery(handleGetPucharse.type, handlePucharseSaga);
  yield takeEvery(handlePostPucharse.type, handlePostPucharseSaga);
}

export default pucharseSaga;
