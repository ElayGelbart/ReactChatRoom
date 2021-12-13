import server from "../server.ts"
import request from "supertest"
import async from "async"
import { mongoClient } from "../server"
import { MongoClient } from "mongodb"
import { listen } from "../index"
require("dotenv").config();
const UserLoginMockData = { "username": "Aladdin" }
const MsgMockData = { msgAuthor: "Aladdin", msgText: "Testing" }
let ServerSentJWT;

describe('Login', () => {

  describe('Login with Username in JSON', () => {
    it('should Response with cookie and 200 status Code', async () => {
      const response = await request(server).post("/user/login").send(UserLoginMockData)
        .expect(200)
        .expect("set-cookie", /JWT=\w+.\w+.\w+/)
      ServerSentJWT = response.headers["set-cookie"][0].match(/\w+\.\w+\..+?(?=;)/)[0];
    })

  })

  describe('Login without Username JSON', () => {
    it('should response with 400 status code', async () => {
      const response = await request(server).post("/user/login").send()
      expect(response.statusCode).toBe(400)
    })

  })


})

describe('General auth', () => {
  it('should Pass Auth with JWT', async () => {
    const response = await request(server).post("/user/auth")
      .set("Authorization", `Bearer ${ServerSentJWT}`)
      .expect(200)
    expect(response.body).toMatchObject({ "username": /\w+/ })
  })

  it('should Fail 403 Auth without JWT', async () => {
    const response = await request(server).post("/user/auth")
      .expect(403)
  })

  it('should Fail 403 Auth with invalid JWT', async () => {
    const response = await request(server).post("/user/auth")
      .set("Authorization", `Bearer InvalidInvalid`)
      .expect(403)
  })
})

describe('EventSource', () => {
  it('should get 403 without Cookie Auth', async () => {
    const response = await request(server).get("/chat/stream")
      .expect(403)
  })
  it('should get EventSource with Cookie Auth', (done) => {
    request(server).get("/chat/stream") // Basic SSE event
      .set("Cookie", `JWT=${ServerSentJWT}`)
      .set("Connection", "keep-alive")
      .set("Accept", "text/event-stream")
      .buffer(true).parse((res) => {
        res.on("data", (res) => {
          const serverBuffer = Buffer.from(res, "utf-8")
          const stringBuffer = serverBuffer.toString().replace("data:", "");
          const resObj = JSON.parse(stringBuffer);
          expect(resObj.users.length > 0).toBe(true)
        })
      }).timeout({ response: 4000, deadline: 4500 }).catch(() => { done() })
  })
  describe('Post Msgs', () => {
    it('should fail 403 with invalid JWT', (done) => {
      request(server).post("/chat/new/msg").expect(403, done)
    });

    it('should fail 400 without right Msg object', (done) => {
      request(server).post("/chat/new/msg")
        .set("Authorization", `Bearer ${ServerSentJWT}`)
        .expect(400, done)
    });

    it('should post New Msg with JWT and Msg object', (done) => {
      async.series([
        function (cb) {
          request(server).post("/chat/new/msg")
            .set("Authorization", `Bearer ${ServerSentJWT}`)
            .send(MsgMockData).then(cb())
        },
        function (cb) {
          request(server).get("/chat/stream") // Basic SSE event
            .set("Cookie", `JWT=${ServerSentJWT}`)
            .set("Connection", "keep-alive")
            .set("Accept", "text/event-stream")
            .buffer(true).parse((res) => {
              res.on("data", (res) => {
                const serverBuffer = Buffer.from(res, "utf-8")
                const stringBuffer = serverBuffer.toString().replace("data:", "");
                console.log(stringBuffer)
                const resObj = JSON.parse(stringBuffer);
                expect(resObj.msgs[resObj.msgs.length - 1].msgText).toBe("Testing")
              })
            })
            .timeout({ response: 4000, deadline: 4500 }).catch(() => cb())
        },
      ], done)
    });
  })
})


afterAll(async () => {
  listen.close(() => {
    console.log("server closed")
  })
  setTimeout(async () => {
    await mongoClient.close()
  }, 3000)
});


