import express from "express";
import cors from "cors";
import { EventEmitter } from "events";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import checkAuthJWT from "./middleware/security/Auth";
require("dotenv").config();

const MongoUri = process.env.MONGO_URI || process.argv[2];
mongoose.connect(MongoUri, () => {
  console.log("Mongo Connected");
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const USERS: jwt.JwtPayload[] = [];
const MSGS: { msgAuthor: string; msgText: string; msgTime: string }[] = [];

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
    console.log(userMsgObj, "MSGMSG 4TEST");

    res.send("sucseesed");
    MsgEvent.emit("sendNewMsg", userMsgObj);
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
