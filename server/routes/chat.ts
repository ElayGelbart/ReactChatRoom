import express from "express";
import jwt from "jsonwebtoken";
import { MsgEvent } from "../events/MsgEvent";
import { mongoClient } from "../server";
import checkAuthJWT from "../middleware/security/Auth";
import { JWTSALT } from "../secret";

const chatRouter = express.Router();

type UserSchema = {
  username: string;
};

chatRouter.get(
  "/stream",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
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
      const MSGS = await mongoClient
        .db("ReactChatRoom")
        .collection("Msgs")
        .find()
        .toArray();
      const USERS = await mongoClient
        .db("ReactChatRoom")
        .collection("Users")
        .find()
        .toArray();
      MsgEvent.on("sendInfo", async () => {
        const MSGS = await mongoClient
          .db("ReactChatRoom")
          .collection("Msgs")
          .find()
          .toArray();
        const USERS = await mongoClient
          .db("ReactChatRoom")
          .collection("Users")
          .find()
          .toArray();
        res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
      });
      res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);

      req.on("close", async () => {
        await mongoClient
          .db("ReactChatRoom")
          .collection("Users")
          .deleteOne({ username: userObj.username });
        MsgEvent.emit("sendNewMsg", {
          msgAuthor: "Server",
          msgText: `${userObj.username} Disconnected`,
          msgTime: new Date(),
        });
      });
    } catch (err) {
      next({ status: 403, msg: "JWT invalid" });
    }
  }
);

chatRouter.post(
  "/new/msg",
  checkAuthJWT,
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    const { msgAuthor, msgText }: { [key: string]: string } = req.body;
    if (!msgAuthor || !msgText) {
      next({ status: 400, msg: "Need More Fields" });
      return;
    }
    const userMsgObj = { msgAuthor, msgText, msgTime: new Date() };
    console.log(userMsgObj, "MSGMSG 4TEST");

    res.send("sucseesed");
    MsgEvent.emit("sendNewMsg", userMsgObj);
  }
);

export default chatRouter;
