const express = require("express");

const port = process.env.PORT || 8080;

const app = express();

app.listen(port, () => {
  console.log(`server listen to port: ${port}`)
})