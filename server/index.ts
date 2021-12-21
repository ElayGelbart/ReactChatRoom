import server from "./server";
const port = process.env.PORT || 8080;

export const listen = server.listen(port, () => {
  console.log(`server listen to port: ${port}`);
});
