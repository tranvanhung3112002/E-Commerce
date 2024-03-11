import { call, put, takeEvery } from "redux-saga/effects";

import { IReview } from "../../../types/Models";
import reviewApi from "../../../services/reviewApi";
import {
  handleGetReviewSuccess,
  handleGetListReviewFail,
  handleGetReview,
  handlePostReview,
} from "../Reducers/reviewSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleGetReviewSaga() {
  try {
    const res: IReview[] = yield call(reviewApi.getAllReviews);

    yield put(handleGetReviewSuccess(res));
  } catch (error) {
    yield put(handleGetListReviewFail());
  }
}

function* handlePostReviewSaga(action: PayloadAction<IReview>) {
  try {
    const res: IReview[] = yield call(() =>
      reviewApi.postReview(action.payload)
    );

    yield put(handleGetReviewSuccess(res));
  } catch (error) {
    yield put(handleGetListReviewFail());
  }
}
function* reviewSaga() {
  yield takeEvery(handleGetReview.type, handleGetReviewSaga);
  yield takeEvery(handlePostReview.type, handlePostReviewSaga);
}

export default reviewSaga;
