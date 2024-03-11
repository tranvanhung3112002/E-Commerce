import * as React from "react";

// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

import styles from "./Login.module.css";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import {
  handleGetUser,
  handlegetCloseLogin,
} from "../../features/Redux/Reducers/loginSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../features/Redux/Store/store";
import { handlePucharseByUser } from "../../features/Redux/Reducers/pucharseSlice";
export default function index() {
  const [formState, setFormState] = useState({
    username: "hungnguyen",
    password: "hung123",
    errorUsername: "",
    errorPassword: "",
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      username: e.target.value.trim(),
      errorUsername: "",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value.trim());

    setFormState((prev) => ({
      ...prev,
      password: e.target.value.trim(),
      errorPassword: "",
    }));
    if (formState.password.length < 4 || formState.password.length > 16) {
      setFormState((prev) => ({
        ...prev,
        errorPassword: "Password length must be between 4 and 16 characters!",
      }));
    }
  };
  const validate = () => {
    let error = false;
    if (!formState.username) {
      setFormState((prev) => ({
        ...prev,
        errorUsername: "Username is required",
      }));
      error = true;
    } else {
      setFormState((prev) => ({ ...prev, errorEmail: "" }));
      error = false;
    }
    if (!formState.password) {
      setFormState((prev) => ({
        ...prev,
        errorPassword: "password is required",
      }));
    }
    return error;
  };
  const dispatch = useDispatch();
  const dataUsers = useSelector(
    (state: RootState) => state.reducer.loginSlice.listUsers
  );

  const statusDrawerLogin = useSelector(
    (state: RootState) => state.reducer.loginSlice.open
  );

  // const listPurchase = useSelector(
  //   (state: RootState) => state.reducer.pucharseSlice.listPucharse
  // );

  var userLogin: any;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validate()) {
      console.log(formState);
      return;
    } else {
      userLogin = dataUsers.find(
        (user) =>
          user.username === formState.username &&
          user.password === formState.password
      );
      if (userLogin) {
        dispatch(handleGetUser(userLogin));
        dispatch(handlegetCloseLogin());

        dispatch(handlePucharseByUser(userLogin.id));
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  console.log(statusDrawerLogin);

  return (
    <>
      <Box
        sx={{
          padding: "16px",
          borderBottom: "1px solid #000",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          onClick={() => dispatch(handlegetCloseLogin())}
          component={"span"}
          sx={{ fontSize: "1.5rem", fontWeight: "300", cursor: "pointer" }}
        >
          {" "}
          <i className="fa-solid fa-xmark"></i>
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={styles.drawer}
      >
        {/* <TextField
          id="username"
          name="username"
          label="Username or email address"
          variant="outlined"
          fullWidth
          autoFocus
          sx={{ marginY: "8px" }}
          value={username}
          onChange={handleUsernameChange}
        /> */}

        <FormControl
          sx={{ marginY: "8px", paddingBottom: "8px" }}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="outlined">username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            autoFocus
            label="username"
            value={formState.username}
            onChange={handleUsernameChange}
            sx={{ paddingY: "12px" }}
          />
          {formState.errorUsername && (
            <div className="text-danger">{formState.errorUsername}</div>
          )}
        </FormControl>

        <FormControl sx={{ marginY: "8px" }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ paddingY: "12px" }}
            label="Password"
            value={formState.password}
            onChange={handlePasswordChange}
          />
          {formState.errorPassword && (
            <div className="text-danger">{formState.errorPassword}</div>
          )}
        </FormControl>
        <Button
          type="submit"
          sx={{ marginY: "8px", paddingY: "8px" }}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
