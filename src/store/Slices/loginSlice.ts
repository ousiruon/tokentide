import { createSlice } from "@reduxjs/toolkit";
interface LoginState {
  isLoggedIn: boolean;
  credentialsFalse: boolean | null;
  credentials: {
    username: string;
    password: string;
  };
}
const initialState: LoginState = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? localStorage.getItem("isLoggedIn") === "true"
      ? true
      : false
    : false,
  credentialsFalse: null,
  credentials: {
    username: "demo",
    password: "demo",
  },
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { username, password, rememberMe } = action.payload;
      if (
        username === state.credentials.username &&
        password === state.credentials.password
      ) {
        if (rememberMe) {
          localStorage.setItem("isLoggedIn", "true");
        }
        state.isLoggedIn = true;
        state.credentialsFalse = state.credentialsFalse ? false : null;
      } else {
        state.isLoggedIn = false;
        state.credentialsFalse = true;
      }
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.credentialsFalse = null;
      localStorage.getItem("isLoggedIn") &&
        localStorage.removeItem("isLoggedIn");
    },
  },
});
export const { setLogin, setLogout } = loginSlice.actions;
