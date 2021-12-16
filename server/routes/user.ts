import express from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import crypto from "crypto";
import { JWTSALT } from "../secret";
import checkAuthJWT from "../middleware/security/Auth";
import { UsersCollection } from "../server";
require("dotenv").config();
interface RequestBodyUser {
  username: string;
  password: string;
  email?: string;
}

const userRouter = express.Router();

userRouter.post("/login", async (req, res, next) => {
  //future more complex login
  const { username, password }: RequestBodyUser = req.body;
  if (!username || !password) {
    next({ status: 400, msg: "Enter Username" });
    return;
  }
  try {
    const userFound = await UsersCollection.findOne({ username: username });
    if (!userFound || !process.env.HASHPASS_KEY) {
      next({ status: 400, msg: "Bad Login information" });
      return;
    }
    const hashpass = crypto
      .createHmac("sha256", process.env.HASHPASS_KEY)
      .update(password)
      .digest("hex");
    if (userFound.password !== hashpass) {
      next({ status: 400, msg: "Bad Login information" });
      return;
    }
    const JWTcookie: string = jwt.sign({ username: username }, JWTSALT, {
      expiresIn: "1h",
    });
    res.cookie("JWT", JWTcookie, { maxAge: 1021031 });
    res.send();
  } catch (err) {
    next({ status: 500, msg: "something went wrong" });
  }
});

userRouter.post("/register", async (req, res, next) => {
  const { username, password, email }: RequestBodyUser = req.body;
  if (!username || !password || !email) {
    next({ status: 400, msg: "invalid request" });
    return;
  }
  if (
    !validator.isEmail(email) ||
    !validator.isAlphanumeric(username) ||
    !validator.isLength(username, { min: 3, max: 20 }) ||
    !validator.isStrongPassword(password, { minLength: 4 })
  ) {
    next({ status: 400, msg: "invalid Body" });
    return;
  }
  try {
    const userFound = await UsersCollection.findOne({ username: username });
    if (userFound || !process.env.HASHPASS_KEY) {
      next({ status: 400, msg: "pick other username" });
      return;
    }
    const hashpass = crypto
      .createHmac("sha256", process.env.HASHPASS_KEY)
      .update(password)
      .digest("hex");
    await UsersCollection.insertOne({ username, email, password: hashpass });
    res.send();
  } catch (err) {
    next({ status: 500, msg: "something went wrong" });
  }
});

userRouter.post("/auth", checkAuthJWT, async (req, res, next) => {
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
    res.send(cookieUserObj);
  } catch (err) {
    console.log(err);
    next({ status: 444, msg: "unknown error" });
  }
});

export default userRouter;
