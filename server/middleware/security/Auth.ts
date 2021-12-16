import * as jwt from "jsonwebtoken";
import express from "express";
const JWTSALT = "shhhh";

export default function checkAuthJWT(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void {
  const { authorization } = req.headers;
  const { cookie } = req.headers;
  let UserJWT;
  if (!authorization && cookie) {
    UserJWT = cookie.split("=")[1];
  } else if (authorization && !cookie) {
    UserJWT = authorization.split(" ")[1];
  } else {
    next({ status: 403, msg: "Need JWT" });
    return;
  }
  try {
    const { username } = jwt.verify(UserJWT, JWTSALT) as jwt.JwtPayload;
    req.username = username;
    next();
    return;
  } catch (err) {
    next({ status: 403, msg: "invalid JWT" });
    return;
  }
}
