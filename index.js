const express = require("express");
const cors = require("cors")
const port = process.env.PORT || 8080;

const app = express();
app.use(cors())
const USERS = ["wow"]
const MSGS = [{
  msgAuthor: "Elay Gelbart",
  msgText: "Hello World",
  msgTime: "Now"
}]
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/chat/stream", (req, res, next) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  });

  setInterval(() => {
    res.write(`data: ${JSON.stringify(MSGS)}\n\n`);
  }, 3000)
});

app.post("/chat/new/msg", (req, res, next) => {
  console.log(req.body, "body");
  const { msgAuthor, msgText } = req.body;
  MSGS.push({ msgAuthor, msgText, msgTime: new Date() })
  res.send("sucseesed");
})

app.use((err, req, res, next) => {
  console.log("in error handler");
  if (err.status) {
    return;
  }
  res.send(err).status(500)
})

app.listen(port, () => {
  console.log(`server listen to port: ${port}`)
})