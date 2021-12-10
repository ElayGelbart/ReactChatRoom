import { EventEmitter } from "events";

export const MsgEvent = new EventEmitter();

MsgEvent.on("sendInfo", (res, MSGS, USERS) => {
  res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
});
MsgEvent.on("sendNewMsg", (UserMsgObj) => {
  MSGS.push(UserMsgObj);
  MsgEvent.emit("sendInfo");
});
