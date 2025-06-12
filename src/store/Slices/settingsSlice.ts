import { createSlice } from "@reduxjs/toolkit";
interface initialState {
  theme: "dark" | "light";
  currency: "USD" | "EUR" | "CAD";
  openedSettings: boolean;
  openedSearch: boolean;
}
const initialState: initialState = {
  theme:
    localStorage.theme === "dark"
      ? "dark"
      : !("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  currency: "currency" in localStorage ? localStorage.currency : "CAD",
  openedSettings: false,
  openedSearch: false,
};
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSettings: (state, action) => {
      state.openedSettings = action.payload;
    },
    toggleSearch: (state, action) => {
      state.openedSearch = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});
export const { toggleSettings, toggleSearch, setTheme, setCurrency } = settingsSlice.actions;
