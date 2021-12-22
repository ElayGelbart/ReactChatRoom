import { createSlice } from "@reduxjs/toolkit";
import sseReducer from "../reducers/sseReducer";
const datainitState: State.SSE = { msgs: [], users: [] };

const dataSlice = createSlice({
  name: "data",
  initialState: datainitState,
  reducers: { sseReducer },
});

export default dataSlice;
export const setSSEaction = dataSlice.actions.sseReducer;
