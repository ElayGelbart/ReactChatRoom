import express from "express";
import jwt from "jsonwebtoken";
import { JWTSALT } from "../secret";
const msgRouter = express.Router();

msgRouter.get(
  "/stream",
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
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
      MsgEvent.on("sendInfo", () => {
        res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
      });
      res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);

      req.on("close", () => {
        const filtredUSERS = USERS.filter(
          (user) => user.username != userObj.username
        );
        USERS.length = 0;
        for (let user of filtredUSERS) {
          USERS.push(user);
        }
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
