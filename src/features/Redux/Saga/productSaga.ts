import { getProductsAPI } from "../../../services/productsAPIService";
import { call, put, takeEvery} from "redux-saga/effects";
import { handleProductsFetchFailed, handleProductsFetchRequest, handleProductsFetchSuccess } from "../Reducers/productSlice";


function* fetchProduct():any{
    try {
        const response = yield call(()=>getProductsAPI()) ; 
        yield put(handleProductsFetchSuccess(response)) ; 
    } catch (error) {
        put(handleProductsFetchFailed()) ; 
    }
}

function* productSaga(){
    yield takeEvery(handleProductsFetchRequest,fetchProduct) ; 
}




export default productSaga ; 

