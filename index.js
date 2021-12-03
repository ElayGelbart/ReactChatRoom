const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const JWTSALT = "shhhh";
const port = process.env.PORT || 8080;

const app = express();
app.use(cors())
const USERS = []
const MSGS = []
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/chat/stream", checkAuthJWT, (req, res, next) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  });

  setInterval(() => {
    res.write(`data: ${JSON.stringify({ users: USERS, msgs: MSGS })}\n\n`);
  }, 2000)
});

app.post("/chat/new/msg", checkAuthJWT, (req, res, next) => {
  const { msgAuthor, msgText } = req.body;
  MSGS.push({ msgAuthor, msgText, msgTime: new Date() })
  res.send("sucseesed");
});

app.post("/users/auth", checkAuthJWT, (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const UserJWT = authorization.split(" ")[1];
    const cookieUserObj = jwt.verify(UserJWT, JWTSALT);
    USERS.push(cookieUserObj)
    res.send(cookieUserObj);
  } catch (err) {
    next({ status: 500, msg: "unknown error" })
  }
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