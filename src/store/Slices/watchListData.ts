import { createSlice } from "@reduxjs/toolkit";
export interface WatchListProp {
  watchList: string[];
  listName: string;
}
const initialState: WatchListProp = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.watchList)
    : [],
  listName: localStorage.getItem("listName")
    ? JSON.parse(localStorage.listName)
    : "My watchlist",
};
export const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addCoinWatchList: (state, action) => {
      state.watchList.push(action.payload);
    },
    removeCoinWatchList: (state, action) => {
      state.watchList = state.watchList.filter((item) => {
        return item !== action.payload;
      });
    },
    setListName: (state, action) => {
      state.listName = action.payload;
    },
  },
});
export const { addCoinWatchList, removeCoinWatchList, setListName } =
  watchListSlice.actions;
