import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HistoryItem {
  account: string;
  repo: string;
}

interface HistoryState {
  historyList: HistoryItem[];
}

const initialState: HistoryState = {
  historyList: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<HistoryItem>) => {
      state.historyList.unshift(action.payload);
    },
    clearHistory: (state) => {
      state.historyList = [];
    },
  },
});

export const { addHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
