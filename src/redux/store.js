import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    theme: themeReducer,

  },
});

export default store;

