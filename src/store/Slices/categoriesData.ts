import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface Category {
  id: string;
  name: string;
}
export interface CategoryWithData extends Category {
  totalCoins: number;
  oneHourAverage: number;
  twentyFourHourAverage: number;
  sevenDaysAverage: number;
  marketCapTotal: number;
  volume24H: number;
}
interface CatgoriesData {
  allCategories: Category[] | [];
  allCategoriesWithData: CategoryWithData[] | [];
  singleCategory: CategoryWithData | null;
  loading: boolean;
  error: string | null;
}
const initialState: CatgoriesData = {
  allCategories: [],
  allCategoriesWithData: [],
  singleCategory: null,
  loading: false,
  error: null,
};
export const getCategories = createAsyncThunk<Category[], void>(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/tags.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      return jsonData as Category[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);
export const categoriesData = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.allCategoriesWithData = action.payload;
    },
    setCategory: (state, action) => {
      state.singleCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred";
      });
  },
});
export const { setCategories, setCategory } = categoriesData.actions;
