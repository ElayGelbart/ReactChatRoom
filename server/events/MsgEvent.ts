import { EventEmitter } from "events";
import MsgModel from "../models/MsgModel";
import { mongoClient } from "../server";
export const MsgEvent = new EventEmitter();

MsgEvent.on("sendInfo", async (res) => {
  const MSGS = await mongoClient.db("ReactChatRoom").collection("Msgs").find();
  const USERS = await mongoClient
    .db("ReactChatRoom")
    .collection("Users")
    .find();
  res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
});
MsgEvent.on("sendNewMsg", async (UserMsgObj) => {
  await mongoClient
    .db("ReactChatRoom")
    .collection("Msgs")
    .insertOne(UserMsgObj);
  MsgEvent.emit("sendInfo");
});
