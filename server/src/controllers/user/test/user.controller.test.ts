import { UserController } from "../user.controllers";
import { describe, it, expect } from "@jest/globals";
import { NextFunction } from "express";
import { faker } from "@faker-js/faker";
import httpMocks from "node-mocks-http";

describe("User Controller", () => {
  let userController: UserController;
  let userRepository: any;

  beforeEach(() => {
    userRepository = {
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      getUserByUserId: jest.fn(),
    };
    userController = new UserController(userRepository);
  });

  describe("login", () => {
    it("returns 400 when is empty userId or password", async () => {
      const userId = " ";
      const password = " ";
      const req = httpMocks.createRequest({
        body: {
          userId,
          password,
        },
      });

      const res = httpMocks.createResponse();
      const next: NextFunction = jest.fn();

      await userController.login(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toStrictEqual({
        result: 0,
        message: "Id or Password is Empty",
      });
    });

    it("returns 400 when is invalid userId or password", async () => {
      const userId = 'select * from user where id = "test";';
      const password = 'select * from user where id = "test";';
      const req = httpMocks.createRequest({
        body: {
          userId,
          password,
        },
      });
      const res = httpMocks.createResponse();
      const next: NextFunction = jest.fn();

      await userController.login(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toStrictEqual({
        result: 0,
        message: "Id or Password is Invalid",
      });
    });

    it("returns 400 when is too short", async () => {
      const userId = faker.random.alphaNumeric(3);
      const password = faker.random.alphaNumeric(3);
      const req = httpMocks.createRequest({
        body: {
          userId,
          password,
        },
      });
      const res = httpMocks.createResponse();
      const next: NextFunction = jest.fn();

      await userController.login(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toStrictEqual({
        result: 0,
        message: "Id or Password is Too Short",
      });
    });

    // it("returns 404 when not founded user", async () => {
    //   const userId = faker.internet.userName();
    //   const password = faker.random.alphaNumeric(10);
    //   const res = httpMocks.createResponse();
    //   const req = httpMocks.createRequest({
    //     body: {
    //       userId,
    //       password,
    //     },
    //   });

    //   await userController.login(req, res);
    //   userRepository.getUserById = jest.fn().mockReturnValue(false);

    //   expect(res.statusCode).toBe(404);
    //   expect(res._getJSONData()).toStrictEqual({
    //     result: 0,
    //     message: "Not Founded User",
    //   });
    // });
  });

  describe("signup", () => {
    it("returns 400 when is empty userId or password or email or name or nickname", async () => {
      const res = httpMocks.createResponse();
      const req = httpMocks.createRequest({
        body: {
          userId: "",
          password: "",
          email: "",
          name: "",
          nickname: "",
        },
      });

      await userController.signup(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toStrictEqual({
        result: 0,
        message: "Id or Password or Email or Name is Empty",
      });
    });

    it("returns 400 when is invalid email", async () => {
      const res = httpMocks.createResponse();
      const req = httpMocks.createRequest({
        body: {
          userId: faker.internet.userName(),
          password: faker.random.alphaNumeric(10),
          email: "test",
          name: faker.name.firstName(),
          nickname: faker.name.firstName(),
        },
      });

      await userController.signup(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toStrictEqual({
        result: 0,
        message: "Email is Invalid",
      });
    });

    it("returns 401 when exist userId", async () => {
      const res = httpMocks.createResponse();
      const req = httpMocks.createRequest({
        body: {
          userId: faker.internet.userName(),
          password: faker.random.alphaNumeric(10),
          email: faker.internet.email(),
          name: faker.name.firstName(),
          nickname: faker.name.firstName(),
        },
      });

      const mockFn = jest.fn().mockImplementation(() => {
        return {
          count: 1,
        };
      });
      console.log(mockFn());
      await userController.signup(req, res);
      userRepository.getUserByUserId = jest.fn().mockReturnValue(mockFn());

      expect(res.statusCode).toBe(401);
      expect(res._getJSONData()).toStrictEqual({
        result: 0,
        message: "Exist User",
      });
    });
  });
});
