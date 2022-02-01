import { MsgsCollection, UsersCollection } from "../server";
import { io } from "../index";
export const addMsgEvent = async (userMsgObjJSON: string) => {
  console.log(userMsgObjJSON, "addmsg");
  const userMsgObj = JSON.parse(userMsgObjJSON);
  await MsgsCollection.insertOne({ ...userMsgObj, msgTime: new Date() });
  io.emit("msgsUsersData", await getMsgUsersJSON());
};

export const getMsgUsersJSON = async () => {
  const msgs = await MsgsCollection.find({}).toArray();
  const connectedUsers = await UsersCollection.find({
    connected: true,
  }).toArray();
  return JSON.stringify({ msgs: msgs, users: connectedUsers });
};
export const getMsgsUsersEvent = async () => {
  const userData = JSON.parse(await getMsgUsersJSON());
};
export const userConnectedEvent = async (userObj: { username: string }) => {
  UsersCollection.updateOne(
    { username: userObj.username },
    { $set: { connected: true } }
  );
  console.log("in here user connected");
  io.emit("msgsUsersData", await getMsgUsersJSON());
};
