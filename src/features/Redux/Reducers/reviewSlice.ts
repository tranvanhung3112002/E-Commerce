import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReview } from "../../../types/Models";

interface InitialState {
  loading: boolean;
  listReview: IReview[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  listReview: [],
  error: "",
};

const reviewSlice = createSlice({
  name: "review",
  initialState: initialState,
  reducers: {
    handleGetReview: (state) => {
      state.loading = true;
    },
    handlePostReview: (state, action: PayloadAction<any>) => {
      state.loading = true;
      console.log(action.payload);
    },
    handleGetReviewSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.listReview = action.payload;
    },
    handleGetListReviewFail: (state) => {
      state.loading = false;
      state.error = "Call Failed";
    },
  },
});

export const {
  handleGetReview,
  handlePostReview,
  handleGetReviewSuccess,
  handleGetListReviewFail,
} = reviewSlice.actions;

export default reviewSlice.reducer;
