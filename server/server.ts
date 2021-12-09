import express from "express";
import cors from "cors";
import { EventEmitter } from "events";
import * as jwt from "jsonwebtoken";
import checkAuthJWT from "./middleware/security/Auth";
const JWTSALT = "shhhh";
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
const MsgEvent = new EventEmitter();
MsgEvent.on("sendNewMsg", (UserMsgObj) => {
  MSGS.push(UserMsgObj);
  MsgEvent.emit("sendInfo");
});

const USERS: jwt.JwtPayload[] = [];
const MSGS: { msgAuthor: string; msgText: string; msgTime: string }[] = [];

server.get(
  "/chat/stream",
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
      if (typeof userObj === "string") {
        throw userObj;
      }

      MsgEvent.on("sendInfo", () => {
        res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
      });
      res.send(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);

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
        MsgEvent.emit("sendInfo");
      });
    } catch (err) {
      next({ status: 403, msg: "JWT invalid" });
    }
  }
);

server.post(
  "/chat/new/msg",
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
    console.log(userMsgObj);

    MsgEvent.emit("sendNewMsg", userMsgObj);
    res.send("sucseesed");
  }
);

server.post(
  "/users/auth",
  checkAuthJWT,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw authorization;
      }
      const UserJWT = authorization.split(" ")[1];
      const cookieUserObj = jwt.verify(UserJWT, JWTSALT);
      if (typeof cookieUserObj === "string") {
        throw cookieUserObj;
      }
      USERS.push(cookieUserObj);
      res.send(cookieUserObj);
    } catch (err) {
      next({ status: 500, msg: "unknown error" });
    }
  }
);

server.post(
  "/users/login",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //future more complex login
    const { username } = req.body;
    if (!username) {
      next({ status: 400, msg: "Enter Username" });
      return;
    }
    const JWTcookie: string = jwt.sign({ username: username }, JWTSALT, {
      expiresIn: "1h",
    });
    res.cookie("JWT", JWTcookie, { maxAge: 1021031 });
    res.send("Login Sucssued");
  }
);

server.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (err.status) {
      res.status(err.status).send(err.msg);
      return;
    }
    res.send(err).status(500);
  }
);

export default server;
