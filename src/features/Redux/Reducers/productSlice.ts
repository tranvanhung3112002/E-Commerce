import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/Models";

interface initialState {
  loadding: boolean;
  listProduct: IProduct[];
  error: string;
}

const initialState: initialState = {
  loadding: false,
  listProduct: [],
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleProductsFetchRequest(state) {
      state.loadding = true;
    },

    handleProductsFetchSuccess(state, action: PayloadAction<any>) {
      state.loadding = false;
      state.listProduct = action.payload;
    },

    handleProductsFetchFailed(state) {
      state.loadding = false;
      state.error = "call fail";
    },
  },
});

export const {
  handleProductsFetchRequest,
  handleProductsFetchSuccess,
  handleProductsFetchFailed,
} = productsSlice.actions;

export default productsSlice.reducer;
