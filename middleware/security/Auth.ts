import * as jwt from "jsonwebtoken";
const JWTSALT = "shhhh";

export default function checkAuthJWT(req: any, _res: any, next: any): void {
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
