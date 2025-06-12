import { createSlice } from "@reduxjs/toolkit";
const initialState: string[] = ["Token", "Tide"];
export const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {},
});