import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Cryptocurrency } from "../../utilities/data";
interface selectedOptions {
  sortBy:
    | null
    | "priceAsc"
    | "priceDesc"
    | "1hAsc"
    | "1hDesc"
    | "24hAsc"
    | "24hDesc"
    | "7DaysAsc"
    | "7DaysDesc"
    | "marketCapAsc"
    | "marketCapDesc"
    | "volume24Asc"
    | "volume24Desc"
    | "circulatingAsc"
    | "circulatingDesc"
    | "nameAsc"
    | "nameDesc"
    | "latestAsc"
    | "latestDesc"
    | "gainers"
    | "losers"
    | "trending";
  showBy: 10 | 20 | 30 | 40 | 50;
}
interface DataState {
  data: Cryptocurrency[] | [];
  singleData: Cryptocurrency | null;
  footerIntro: string;
  selectedOptions: selectedOptions;
  loading: boolean;
  error: string | null;
}
const initialState: DataState = {
  data: [],
  singleData: null,
  footerIntro: "TokenTide offers deep insights into crypto markets, tracking token performance, trading volume, and community sentiment. It blends real-time data with developer activity and liquidity trends for a well-rounded market view.",
  selectedOptions: {
    sortBy: null,
    showBy: 20,
  },
  loading: false,
  error: null,
};
export const getData = createAsyncThunk<Cryptocurrency[], void>(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/data.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      return jsonData as Cryptocurrency[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSingleData: (state, action) => {
      state.singleData =
        state.data.find((item) => item.id === action.payload) || null;
    },
    setSortBy: (state, action) => {
      state.selectedOptions.sortBy = action.payload;
    },
    setShowBy: (state, action) => {
      state.selectedOptions.showBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred";
      });
  },
});
export const { setSingleData, setSortBy, setShowBy } = dataSlice.actions;
