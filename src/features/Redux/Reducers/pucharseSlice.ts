import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPucharse } from "../../../types/Models";

interface InitialState {
  loading: boolean;
  listPucharse: IPucharse[];
  pucharseByUser: IPucharse[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  listPucharse: [],
  pucharseByUser: [],
  error: "",
};

const pucharseSlice = createSlice({
  name: "pucharse",
  initialState: initialState,
  reducers: {
    handleGetPucharse: (state) => {
      state.loading = true;
    },
    handlePostPucharse: (state, action: PayloadAction<any>) => {
      state.loading = true;
      console.log(action.payload);
    },
    handleGetPucharseSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.listPucharse = action.payload;
    },
    handleGetListPucharseFail: (state) => {
      state.loading = false;
      state.error = "Call Failed";
    },
    handlePucharseByUser: (state, action: PayloadAction<any>) => {
      state.pucharseByUser = state.listPucharse.filter(
        (pucharse) => (pucharse.userId = action.payload)
      );
    },
  },
});

export const {
  handleGetPucharse,
  handleGetPucharseSuccess,
  handleGetListPucharseFail,
  handlePucharseByUser,
  handlePostPucharse,
} = pucharseSlice.actions;

export default pucharseSlice.reducer;
