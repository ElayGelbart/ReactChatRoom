const addMsgReducer = (
  state: State.SSE,
  { payload }: { type: string; payload: State.MsgData }
) => {
  return { msgs: [...state.msgs, payload], users: [...state.users] };
};
export default addMsgReducer;
