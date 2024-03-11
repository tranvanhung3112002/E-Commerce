import { call, put, takeEvery } from "redux-saga/effects";
import categoryApi from "../../../services/categoryApi";
import {
  handleGetCategories,
  handleGetCategoriesSuccess,
  handleGetListCategoriesFail,
} from "../Reducers/categorySlice";
import { ICategory } from "../../../types/Models";

function* handleGetCategoriesSaga(): any {
  try {
    const res: ICategory[] = yield call(categoryApi.getAllCategories);

    yield put(handleGetCategoriesSuccess(res));
  } catch (error) {
    yield put(handleGetListCategoriesFail());
  }
}

function* categorySaga() {
  yield takeEvery(handleGetCategories.type, handleGetCategoriesSaga);
}

export default categorySaga;
