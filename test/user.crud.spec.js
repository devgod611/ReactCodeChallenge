"use strict";

const _ = require("lodash");
const { expect } = require("chai");
const { server } = require("./config/test.server.js");
const sequelize = require("../config/sequelize/setup.js");
const Test = require("./config/test.utils.js");

const uri = `${server.info.uri}/v0`;
const scope = {};

describe("User CRUD operations -", () => {
  before(async () => {
    await Test.setupDb();
    return Promise.resolve();
  });

  describe("GET /users/{userId}", () => {
    it("should read a given user's information if requester is an admin", async () => {});
    it("should return 401 unauthorized if requester is not an admin", async () => {});
  });

  describe("GET /self", () => {
    it("should read own information", async () => {
      // Create a user and a JWT access token for that user
      scope.user = await sequelize.models.User.create({
        email: `user@example.com`,
      });
      scope.accessToken = await scope.user.generateAccessToken();

      // Add 2 roles to the user
      await Test.assignRoleForUser({
        user: scope.user,
        roleName: "owner",
      });
      await Test.assignRoleForUser({
        user: scope.user,
        roleName: "member",
      });

      // Make the request
      const { statusCode, result } = await server.inject({
        method: "get",
        url: `${uri}/users/self`,
        headers: {
          authorization: `Bearer ${scope.accessToken}`,
        },
      });

      // Assert a proper response
      expect(statusCode).to.equal(200);
      expect(result.id).to.equal(scope.user.id);
      expect(result.uuid).to.equal(scope.user.uuid);
      expect(result.email).to.equal(scope.user.email);
      expect(result.roles.length).to.equal(2);
      expect(result.roles).to.have.members(["owner", "member"]);

      return Promise.resolve();
    });
  });
});
