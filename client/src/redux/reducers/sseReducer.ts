const sseReducer = (
  state: State.SSE,
  { payload }: { type: string; payload: State.SSE }
) => {
  return payload;
};
export default sseReducer;
