import server from "./server";
import request from "supertest"

const UserLoginMockData = { "username": "Aladdin" }

describe('Testing Login', () => {

  describe('Login with UsernameJson', () => {
    test('should Response with 200 status Code', async () => {
      const response = await request(server).post("/users/login").send(UserLoginMockData)
      expect(response.statusCode).toBe(200)
      expect(response.headers["set-cookie"][0]).toMatch(/JWT=\w+.\w+.\w+/)
    })

  })

  // describe('Login without Username', () => {

  // })


})

