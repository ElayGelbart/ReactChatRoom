import * as jwt from "jsonwebtoken";
import express from "express";
const JWTSALT = "shhhh";

export default function checkAuthJWT(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void {
  const { authorization } = req.headers;
  if (!authorization) {
    next({ status: 403, msg: "Need JWT" });
    return;
  }
  try {
    const UserJWT = authorization.split(" ")[1];
    jwt.verify(UserJWT, JWTSALT);
    next();
    return;
  } catch (err) {
    next({ status: 403, msg: "invalid JWT" });
    return;
  }
}
