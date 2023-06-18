import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";
import type { ChartData, ChartOptions } from "chart.js";

export interface StatisticsState {
  languages: ChartData;
  frameworks: ChartData;
  tools: ChartData;
}

const initialState: StatisticsState = {
  languages: {
    labels: ["Javascript", "Orange", "Blue"],
    datasets: [
      {
        label: "occurs times",
        data: [55, 23, 96],
        borderWidth: 0,
      },
    ],
  },
  frameworks: {
    labels: ["VS Code", "Orange", "Blue"],
    datasets: [
      {
        label: "occurs times",
        data: [30, 23, 11],
        borderWidth: 0,
      },
    ],
  },
  tools: {
    labels: ["VS Code", "Orange", "Blue"],
    datasets: [
      {
        label: "occurs times",
        data: [10, 2, 1],
        borderWidth: 0,
      },
    ],
  },
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatisticsState(state, action) {
      state = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.auth,
  //     };
  //   },
  // },
});

export const { setStatisticsState } = statisticsSlice.actions;

export const selectStatisticsData = (state: AppState) => state.statistics;

export default statisticsSlice.reducer;
