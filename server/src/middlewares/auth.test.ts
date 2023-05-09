import jwt from "jsonwebtoken";
import { describe, it, expect } from "@jest/globals";
import { auth } from "./auth";
// import { faker } from "@faker-js/faker";
import httpMocks from "node-mocks-http";
import { NextFunction } from "express";
import { faker } from "@faker-js/faker";

describe("Auth Middleware", () => {
  it("returns 404 when is not Header", async () => {
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    await auth(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({
      result: "1",
      message: "need to Bearer Token in Header",
    });
    expect(next).toHaveBeenCalledTimes(0);
    expect(next).not.toBeCalled();
  });

  it("returns 404 when is not Bearer Token", async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: "invalidtoken",
      },
    });
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    await auth(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({
      result: "1",
      message: "need to Bearer Token in Header",
    });
    expect(next).not.toBeCalled();
  });

  it("returns 404 when is not valid Token", async () => {
    const token = faker.random.alphaNumeric(20);
    const req = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    await auth(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({
      result: "1",
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  it("returns 200 when is valid Token", async () => {
    const token = jwt.sign(
      {
        id: "fakeid",
        password: "fakepassword",
        email: "fakeemail",
      },
      "jwtsecret"
    );
    const req = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    await auth(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(next).toBeCalled();
  });
});
