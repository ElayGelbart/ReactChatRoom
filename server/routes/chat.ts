import express from "express";
import { MsgEvent } from "../events/MsgEvent";
import { MsgsCollection } from "../server";
import checkAuthJWT from "../middleware/security/Auth";

const chatRouter = express.Router();

const LOGGEDUSERS: { username: string }[] = [];

chatRouter.use(checkAuthJWT); //Middleware for auth
chatRouter.get("/stream", async (req, res, next): Promise<void> => {
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  // Security check
  try {
    MsgEvent.emit("sendNewMsg", {
      msgAuthor: "Server",
      msgText: `${req.username} Connected`,
    });
    LOGGEDUSERS.push(req.username);
    const MSGS = await MsgsCollection.find().toArray();
    res.write(`data:${JSON.stringify({ msgs: MSGS, users: LOGGEDUSERS })}\n\n`);

    MsgEvent.on("sendInfo", async () => {
      const MSGS = await MsgsCollection.find().toArray();
      res.write(
        `data:${JSON.stringify({ msgs: MSGS, users: LOGGEDUSERS })}\n\n`
      );
    });

    req.on("close", async () => {
      const usernameIndex = LOGGEDUSERS.findIndex(
        ({ username }) => username === req.username
      );
      LOGGEDUSERS.splice(usernameIndex, 1);
      MsgEvent.emit("sendNewMsg", {
        msgAuthor: "Server",
        msgText: `${req.username} Disconnected`,
      });
    });
  } catch (err) {
    next({ status: 403, msg: "JWT invalid" });
  }
});

chatRouter.post("/new/msg", (req, res, next): void => {
  const { msgAuthor, msgText }: { [key: string]: string } = req.body;
  if (!msgAuthor || !msgText) {
    next({ status: 400, msg: "Need More Fields" });
    return;
  }
  const userMsgObj = { msgAuthor, msgText };
  console.log(userMsgObj, "MSGMSG 4TEST");

  MsgEvent.emit("sendNewMsg", userMsgObj);
  res.send("sucseesed");
});

export default chatRouter;
