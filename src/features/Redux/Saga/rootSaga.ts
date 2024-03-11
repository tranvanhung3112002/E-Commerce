import { all } from "redux-saga/effects";
import productSaga from "./productSaga";
import categorySaga from "./categorySaga";
import loginSaga from "./loginSaga";
import reviewSaga from "./reviewSaga";
import pucharseSaga from "./pucharseSaga";

export default function* rootSaga() {
  yield all([
    categorySaga(),
    productSaga(),
    loginSaga(),
    reviewSaga(),
    pucharseSaga(),
  ]);
}
