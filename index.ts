import * as express from "express";
import * as cors from "cors";
import { EventEmitter } from "events";
import * as jwt from "jsonwebtoken";
import checkAuthJWT from "./middleware/security/Auth";
const JWTSALT = "shhhh";
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
const MsgEvent = new EventEmitter();
MsgEvent.on("sendNewMsg", (UserMsgObj) => {
  MSGS.push(UserMsgObj);
  MsgEvent.emit("sendInfo");
});

const USERS: jwt.JwtPayload[] = [];
const MSGS: { msgAuthor: string; msgText: string; msgTime: string }[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/chat/stream", (req, res, next): void => {
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
    const userCookieJWT = cookie.split("=")[1];
    const userObj = jwt.verify(userCookieJWT, JWTSALT);
    if (typeof userObj === "string") {
      throw userObj;
    }
    res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);

    MsgEvent.on("sendInfo", () => {
      res.write(`data:${JSON.stringify({ msgs: MSGS, users: USERS })}\n\n`);
    });

    req.on("close", () => {
      console.log("closed");
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
});

app.post("/chat/new/msg", checkAuthJWT, (req, res, _next): void => {
  console.log("post new msg");
  const { msgAuthor, msgText } = req.body;
  const userMsgObj = { msgAuthor, msgText, msgTime: new Date() };
  MsgEvent.emit("sendNewMsg", userMsgObj);
  res.send("sucseesed");
});

app.post("/users/auth", checkAuthJWT, (req, res, next) => {
  try {
    const { authorization } = req.headers;
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
});

app.post("/users/login", (req, res, next) => {
  //future more complex login
  const { username } = req.body;
  if (!username) {
    next({ status: 401, msg: "Enter Username" });
    return;
  }
  const JWTcookie: string = jwt.sign({ username: username }, JWTSALT, {
    expiresIn: "1h",
  });
  res.cookie("JWT", JWTcookie, { maxAge: 1021031 });
  res.send("Login Sucssued");
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.log("in error handler");
  if (err.status) {
    res.status(err.status).send(err.msg);
    return;
  }
  res.send(err).status(500);
});

app.listen(port, () => {
  console.log(`server listen to port: ${port}`);
});
