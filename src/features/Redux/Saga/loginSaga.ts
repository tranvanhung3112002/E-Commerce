import { call, put, takeEvery } from "redux-saga/effects";
import loginAPI from "../../../services/loginApi";
import {
  handleLoginFail,
  handleLoginRequest,
  handleLoginSuccess,
} from "../Reducers/loginSlice";
import { IUserLogin } from "../../../types/Models";

function* handlePostLoginSaga() {
  try {
    const res: IUserLogin[] = yield call(loginAPI.postLogin);

    yield put(handleLoginSuccess(res));
  } catch (error) {
    yield put(handleLoginFail());
  }
}

function* loginSaga() {
  yield takeEvery(handleLoginRequest.type, handlePostLoginSaga);
}

export default loginSaga;
