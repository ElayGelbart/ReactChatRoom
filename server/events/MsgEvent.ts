import { EventEmitter } from "events";
import { MsgsCollection } from "../server";
export const MsgEvent = new EventEmitter();

MsgEvent.on("sendNewMsg", async (UserMsgObj) => {
  await MsgsCollection.insertOne({ ...UserMsgObj, msgTime: new Date() });
  MsgEvent.emit("sendInfo");
});
