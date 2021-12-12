import express from "express";
import server from "./server";
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`server listen to port: ${port}`);
});
