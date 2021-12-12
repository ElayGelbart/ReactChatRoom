import express from "express";

export default function ErrorHandler(
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  console.log(err, "err");

  if (err.status) {
    res.status(err.status).send(err.msg);
    return;
  }
  res.send(err).status(500);
}
