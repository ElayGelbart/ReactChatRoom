import server from "./server";
import { Server } from "socket.io";
import {
  getMsgUsersJSON,
  userConnectedEvent,
  addMsgEvent,
  getMsgsUsersEvent,
} from "./events/MsgEvent";
const port = process.env.PORT || 8080;

export const httpServer = server.listen(port, () => {
  console.log(`server listen to port: ${port}`);
});
export const io = new Server(httpServer);
io.on("connection", async (socket) => {
  console.log("someone connected");
  socket.on("userConnect", userConnectedEvent);
  socket.on("getMsgsUsers", getMsgsUsersEvent);
  socket.on("addNewMsg", addMsgEvent);
  socket.emit("msgsUsersData", await getMsgUsersJSON());
});
