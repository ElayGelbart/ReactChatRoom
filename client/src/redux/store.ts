import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlices";
const store = configureStore(dataSlice);
export default store;
