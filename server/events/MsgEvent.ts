import { EventEmitter } from "events";
import { MsgsCollection, UsersCollection } from "../server";
export const MsgEvent = new EventEmitter();

MsgEvent.on("sendNewMsg", async (UserMsgObj) => {
  await MsgsCollection.insertOne({ ...UserMsgObj, msgTime: new Date() });
  MsgEvent.emit("sendInfo");
  return;
});
const addMsgEvent = async (userMsgObj) => {
  await MsgsCollection.insertOne({ ...UserMsgObj, msgTime: new Date() });
};

export const getMsgUsersJSON = async () => {
  const msgs = await MsgsCollection.find({}).toArray();
  const connectedUsers = await UsersCollection.find({
    connected: true,
  }).toArray();
  return JSON.stringify({ msgs: msgs, users: connectedUsers });
};

export const userConnectedEvent = (userObj: { username: string }) => {
  UsersCollection.updateOne(
    { username: userObj.username },
    { $set: { connected: true } }
  );
};
