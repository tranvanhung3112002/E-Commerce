import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserLogin } from "../../../types/Models";

interface InitialState {
  loading: boolean;
  user: IUserLogin;
  listUsers: IUserLogin[];
  open: boolean;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  user: {
    id: "",
    username: "",
    password: "",
  },
  open: false,
  listUsers: [],

  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    handleLoginRequest: (state) => {
      state.loading = true;
    },
    handleLoginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.listUsers = action.payload;
    },
    handleLoginFail: (state) => {
      state.loading = false;
      state.error = "Call Failed";
    },

    handleGetUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    handleLogout: (state) => {
      state.user = {
        id: "",
        username: "",
        password: "",
      };
    },
    handlegetOpenLogin: (state) => {
      state.open = true;
    },
    handlegetCloseLogin: (state) => {
      state.open = false;
    },
  },
});

export const {
  handleLoginRequest,
  handleLoginSuccess,
  handleLoginFail,
  handleGetUser,
  handleLogout,
  handlegetOpenLogin,
  handlegetCloseLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
