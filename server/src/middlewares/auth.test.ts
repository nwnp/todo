import { describe, it, expect } from "@jest/globals";
import { auth } from "./auth";
// import { faker } from "@faker-js/faker";
import httpMocks from "node-mocks-http";
import { NextFunction } from "express";

describe("", () => {
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
});
