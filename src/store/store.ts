import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "./Slices/menuSlice";
import { logoSlice } from "./Slices/logoSlice";
import { loginSlice } from "./Slices/loginSlice";
import { dataSlice } from "./Slices/dataSlice";
import { settingsSlice } from "./Slices/settingsSlice";
import { exchangesData } from "./Slices/exchangesData";
import { categoriesData } from "./Slices/categoriesData";
import { watchListSlice } from "./Slices/watchListData";
import { newsSlice } from "./Slices/newsSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    logo: logoSlice.reducer,
    login: loginSlice.reducer,
    data: dataSlice.reducer,
    categoriesData: categoriesData.reducer,
    exchangeData: exchangesData.reducer,
    newsData: newsSlice.reducer,
    watchListData: watchListSlice.reducer,
    userSettings: settingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
