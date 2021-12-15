import express from "express";
import jwt from "jsonwebtoken";
import { MsgEvent } from "../events/MsgEvent";
import { UsersCollection, MsgsCollection } from "../server";
import checkAuthJWT from "../middleware/security/Auth";
import { JWTSALT } from "../secret";

const chatRouter = express.Router();

chatRouter.get("/stream", async (req, res, next): Promise<void> => {
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "http://localhost:3000", // change this in prod
    "Access-Control-Allow-Credentials": "true",
  });
  // Security check
  const { cookie } = req.headers;

  try {
    if (!cookie) {
      throw cookie;
    }
    const userCookieJWT = cookie.split("=")[1];
    const userObj = jwt.verify(userCookieJWT, JWTSALT);
    console.log(userObj, "user Obj 4test");

    if (typeof userObj === "string") {
      throw userObj;
    }
    MsgEvent.emit("sendNewMsg", {
      msgAuthor: "Server",
      msgText: `${userObj.username} Connected`,
      msgTime: new Date(),
    });

    const MSGS = await MsgsCollection.find().toArray();
    const USERS = await UsersCollection.find().toArray();
    res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);

    MsgEvent.on("sendInfo", async () => {
      const MSGS = await MsgsCollection.find().toArray();
      const USERS = await UsersCollection.find().toArray();
      res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
    });

    req.on("close", async () => {
      await UsersCollection.deleteMany({ username: userObj.username });
      MsgEvent.emit("sendNewMsg", {
        msgAuthor: "Server",
        msgText: `${userObj.username} Disconnected`,
        msgTime: new Date(),
      });
    });
  } catch (err) {
    next({ status: 403, msg: "JWT invalid" });
  }
});

chatRouter.post("/new/msg", checkAuthJWT, (req, res, next): void => {
  const { msgAuthor, msgText }: { [key: string]: string } = req.body;
  if (!msgAuthor || !msgText) {
    next({ status: 400, msg: "Need More Fields" });
    return;
  }
  const userMsgObj = { msgAuthor, msgText, msgTime: new Date() };
  console.log(userMsgObj, "MSGMSG 4TEST");

  MsgEvent.emit("sendNewMsg", userMsgObj);
  res.send("sucseesed");
});

export default chatRouter;
