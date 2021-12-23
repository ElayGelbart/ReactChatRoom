import { createSlice } from "@reduxjs/toolkit";
import sseReducer from "../reducers/sseReducer";
import addMsgReducer from "../reducers/addMsgReducer";
const datainitState: State.SSE = { msgs: [], users: [] };

const dataSlice = createSlice({
  name: "data",
  initialState: datainitState,
  reducers: { sseReducer, addMsgReducer },
});

export default dataSlice;
export const setSSEaction = dataSlice.actions.sseReducer;
export const addNewMsgAction = dataSlice.actions.addMsgReducer;
