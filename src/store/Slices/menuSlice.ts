import { createSlice } from "@reduxjs/toolkit";
export interface MenuProps {
  name: string;
  link: string | null;
  children?: MenuProps[];
}
const initialState: MenuProps[] = [
  {
    name: "Cryptocurrencies",
    link: null,
    children: [
      {
        name: "Trending",
        link: "/trending",
      },
      {
        name: "Latest Listings",
        link: "/latest-listings",
      },
      {
        name: "Gainers and Losers",
        link: "/gainers-and-losers",
      },
    ],
  },
  {
    name: "Exchanges",
    link: "/exchanges",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "News",
    link: "/news",
  },
];
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});
