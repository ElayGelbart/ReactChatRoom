const sseReducer = (
  state: State.SSE,
  { payload }: { type: string; payload: State.SSE }
) => {
  state = payload;
  return state;
};
export default sseReducer;
