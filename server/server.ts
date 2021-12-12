import express from "express";
import cors from "cors";
import mongodb, { MongoClient } from "mongodb";
import ErrorHandler from "./middleware/error/generalErrorHandler";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
require("dotenv").config();

const MongoUri = process.env.MONGO_URI || process.argv[2];
export const mongoClient = new MongoClient(MongoUri);
mongoClient
  .connect()
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(`${err} happend`);
  });

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/user", userRouter);
server.use("/chat", chatRouter);
server.use(ErrorHandler);

export default server;
