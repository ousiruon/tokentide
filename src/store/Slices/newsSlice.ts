import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface paragraphProps {
  title?: string;
  description: string;
}
export interface newsProps {
  id: string;
  date: string;
  reading_duration: string;
  title: string;
  subtitle: string;
  image: string;
  paragraphs: paragraphProps[];
}

export const getNews = createAsyncThunk<newsProps[], void>(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/news.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      return jsonData as newsProps[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);
interface newsState {
  loading: boolean;
  error: string | null;
  newsData: newsProps[] | [];
  singleNew: newsProps | null;
}
const initialState: newsState = {
  loading: false,
  error: null,
  newsData: [],
  singleNew: null,
};
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
        state.error = null;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred";
      });
  },
});
