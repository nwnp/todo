import { UserController } from "./../user.controllers";
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
    };
    userController = new UserController(userRepository);
  });

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

  it("returns 404 when not founded user", async () => {
    const userId = faker.internet.userName();
    const password = faker.random.alphaNumeric(10);
    const res = httpMocks.createResponse();
    const req = httpMocks.createRequest({
      body: {
        userId,
        password,
      },
    });

    await userController.login(req, res);
    userRepository.getUserById = jest.fn().mockReturnValue(false);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({
      result: 0,
      message: "Not Founded User",
    });
  });
});
