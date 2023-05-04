import { describe, it, expect } from "@jest/globals";
import { auth } from "./auth";
import { faker } from "@faker-js/faker";
import httpMocks from "node-mocks-http";
import { NextFunction } from "express";

describe("", () => {
  it("return 404 when token is not exist", async () => {
    const token = faker.datatype.string();
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    await auth(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({
      status: 4,
      message: "Unauthorization",
    });
    expect(next).toHaveBeenCalledTimes(0);
    expect(next).not.toBeCalled();
  });

  it("return 404 when not bearer token", async () => {
    const token = faker.datatype.string();
    const req = httpMocks.createRequest({
      headers: {
        authorization: token,
      },
    });
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    await auth(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({
      status: 4,
      message: "Unauthorization",
    });
    expect(next).toHaveBeenCalledTimes(0);
    expect(next).not.toBeCalled();
  });
});
