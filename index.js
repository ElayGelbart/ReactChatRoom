const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const JWTSALT = "shhhh";
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
});

app.post("/users/auth", checkAuthJWT, (req, res, next) => {
  res.send("verified");
});

app.post("/users/login", (req, res, next) => {
  //future more complex login
  console.log(req.body, "login body");
  const { username } = req.body
  if (!username) {
    next({ status: 401, msg: "Enter Username" })
    return;
  }
  const JWTcookie = jwt.sign({ username: username }, JWTSALT, { expiresIn: "1h" })
  res.cookie("JWT", JWTcookie, { maxAge: 1021031 });
  res.send("Login Sucssued");
})

app.use((err, req, res, next) => {
  console.log("in error handler");
  if (err.status) {
    res.status(err.status).send(err.msg)
    return;
  }
  res.send(err).status(500)
})

app.listen(port, () => {
  console.log(`server listen to port: ${port}`)
});

function checkAuthJWT(req, res, next) {
  console.log("in Check Auth");
  const { authorization } = req.headers;
  if (!authorization) {
    next({ status: 403, msg: "Need JWT" })
    return;
  }
  try {
    const UserJWT = authorization.split(" ")[1];
    jwt.verify(UserJWT, JWTSALT);
    next();
    return;
  } catch (err) {
    next({ status: 403, msg: "invalid JWT" })
    return;
  }
}