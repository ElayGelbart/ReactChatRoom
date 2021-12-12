import express from "express";
import jwt from "jsonwebtoken";
import { JWTSALT } from "../secret";
import checkAuthJWT from "../middleware/security/Auth";
import { mongoClient } from "../server";

const userRouter = express.Router();

userRouter.post(
  "/login",
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

userRouter.post(
  "/auth",
  checkAuthJWT,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw authorization;
      }
      console.log(authorization, "auth");
      const UserJWT = authorization.split(" ")[1];
      const cookieUserObj = jwt.verify(UserJWT, JWTSALT);
      if (typeof cookieUserObj === "string") {
        throw cookieUserObj;
      }
      console.log(cookieUserObj, "cookieauth");

      await mongoClient
        .db("ReactChatRoom")
        .collection("Users")
        .insertOne(cookieUserObj);
      res.send(cookieUserObj);
    } catch (err) {
      console.log(err);
      next({ status: 444, msg: "unknown error" });
    }
  }
);

export default userRouter;
