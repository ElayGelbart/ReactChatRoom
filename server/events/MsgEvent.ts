import { EventEmitter } from "events";
import { mongoDB } from "../server";
export const MsgEvent = new EventEmitter();

MsgEvent.on("sendNewMsg", async (UserMsgObj) => {
  await mongoDB.collection("Msgs").insertOne(UserMsgObj);
  MsgEvent.emit("sendInfo");
});
