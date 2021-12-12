import { EventEmitter } from "events";
import { mongoClient } from "../server";
export const MsgEvent = new EventEmitter();

MsgEvent.on("sendNewMsg", async (UserMsgObj) => {
  await mongoClient
    .db("ReactChatRoom")
    .collection("Msgs")
    .insertOne(UserMsgObj);
  MsgEvent.emit("sendInfo");
});
