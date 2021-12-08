import server from "./server";
import request from "supertest"

const UserLoginMockData = { "username": "Aladdin" }

let ServerSentJWT;
describe('Testing Login', () => {

  describe('Login with Username in JSON', () => {
    test('should Response with cookie and 200 status Code', async () => {
      const response = await request(server).post("/users/login").send(UserLoginMockData)
        .expect(200)
        .expect("set-cookie", /JWT=\w+.\w+.\w+/)
      console.log(response.headers["set-cookie"][0], "server jwt");
      ServerSentJWT = response.headers["set-cookie"][0].match(/\w+\.\w+\..+?(?=;)/)[0];
    })

  })

  describe('Login without Username JSON', () => {
    test('should response with 400 status code', async () => {
      const response = await request(server).post("/users/login").send()
      expect(response.statusCode).toBe(400)
    })

  })


})

describe('Testing General auth', () => {
  test('should Pass Auth with JWT', async () => {
    console.log(ServerSentJWT, "jwt jwt jwt jwt ");
    const response = await request(server).post("/users/auth")
      .set("Authorization", `Bearer ${ServerSentJWT}`)
      .expect(200)
    expect(response.body).toMatchObject({ "username": /\w+/ })
  })

  test('should Fail Auth without JWT', async () => {
    const response = await request(server).post("/users/auth")
      .expect(403)
  })

  test('should Fail Auth with invalid JWT', async () => {
    const response = await request(server).post("/users/auth")
      .set("Authorization", `Bearer InvalidInvalid`)
      .expect(403)
  })
})




