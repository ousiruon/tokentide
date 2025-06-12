import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface ExchangeText {
  question: string; paragraph: string ;
}
export interface Exchange {
  id: string;
  name: string;
  image: string;
  website: string;
  fees: string;
  twitter: string;
  register_link: string;
  description: {
    introduction: string;
    text: ExchangeText[];
  };
}
export interface ExchangeWithData extends Exchange {
  totalCoins: number;
  oneHourAverage: number;
  twentyFourHourAverage: number;
  sevenDaysAverage: number;
  marketCapTotal: number;
  volume24H: number;
}
interface ExchangesData {
  allExchanges: Exchange[] | [];
  allExchangesExtended: ExchangeWithData[] | [];
  singleExchange: ExchangeWithData | null;
  exchangeLoading: boolean;
  exchangeError: string | null;
  exchangeExtendedLoading: boolean;
  exchangeExtendedError: string | null;
}
const initialState: ExchangesData = {
  allExchanges: [],
  allExchangesExtended: [],
  singleExchange: null,
  exchangeLoading: false,
  exchangeError: null,
  exchangeExtendedLoading: false,
  exchangeExtendedError: null,
};
export const getExchangeData = createAsyncThunk<Exchange[], void>(
  "exchanges/fetchExchange",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/exchanges.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      return jsonData as Exchange[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);
export const exchangesData = createSlice({
  name: "exchanges",
  initialState,
  reducers: {
    setExtendedExchangeData: (state, action) => {
      state.allExchangesExtended = action.payload;
    },
    setSingleExchange: (state, action) => {
      state.singleExchange = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getExchangeData.pending, (state) => {
        state.exchangeLoading = true;
        state.exchangeError = null;
      })
      .addCase(getExchangeData.fulfilled, (state, action) => {
        state.exchangeLoading = false;
        state.allExchanges = action.payload;
        state.exchangeError = null;
      })
      .addCase(getExchangeData.rejected, (state, action) => {
        state.exchangeLoading = false;
        state.exchangeError =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred";
      });
  },
});
export const { setExtendedExchangeData, setSingleExchange } =
  exchangesData.actions;
