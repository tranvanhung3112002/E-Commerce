import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../../types/Models";

interface InitialState {
  loading: boolean;
  categories: ICategory[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  categories: [],
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    handleGetCategories: (state) => {
      state.loading = true;
    },
    handleGetCategoriesSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    handleGetListCategoriesFail: (state) => {
      state.loading = false;
      state.error = "Call Failed";
    },
  },
});

export const {
  handleGetCategories,
  handleGetCategoriesSuccess,
  handleGetListCategoriesFail,
} = categorySlice.actions;

export default categorySlice.reducer;
