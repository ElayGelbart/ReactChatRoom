import express from "express";
import cors from "cors";
import mongodb, { MongoClient } from "mongodb";
import ErrorHandler from "./middleware/error/generalErrorHandler";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
require("dotenv").config();
console.log(process.env.NODE_ENV, "nodeenv");

const MongoUri =
  process.env.NODE_ENV === "TEST"
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI;
console.log(MongoUri);
export const mongoClient = new MongoClient(MongoUri as string);
export const UsersCollection = mongoClient.db().collection("Users");
export const MsgsCollection = mongoClient.db().collection("Msgs");
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
server.use(express.static(`${__dirname}/../client/build`));
server.use("/user", userRouter);
server.use("/chat", chatRouter);
server.get("/", (req, res) => {
  res.sendFile(`${__dirname}/../client/build/index.html`);
});

server.use(ErrorHandler);

export default server;
