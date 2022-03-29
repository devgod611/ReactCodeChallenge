"use strict";

const _ = require("lodash");
const { expect } = require("chai");
const { server } = require("./config/test.server.js");
const sequelize = require("../config/sequelize/setup.js");
const Test = require("./config/test.utils.js");

const uri = `${server.info.uri}/v0`;
const scope = {};

describe("Role CRUD operations -", () => {
  before(async () => {
    await Test.setupDb();
    return Promise.resolve();
  });

  describe("GET /roles", () => {
    it("should list all application roles if requester is an admin", async () => {
      // Create a user and a JWT access token for that user
      scope.adminUser = await sequelize.models.User.create({
        email: `admin@example.com`,
      });
      scope.adminAccessToken = await scope.adminUser.generateAccessToken();

      // Add the admin role for the user
      await Test.assignRoleForUser({
        user: scope.adminUser,
        roleName: "admin",
      });

      // Make the request
      const { statusCode, result } = await server.inject({
        method: "get",
        url: `${uri}/roles`,
        headers: {
          authorization: `Bearer ${scope.adminAccessToken}`,
        },
      });

      // Check the response
      expect(statusCode).to.equal(200);
      expect(result.results).to.exist;
      expect(result.results.length).to.equal(
        sequelize.models.Role.defaultRoles.length
      );
      expect(result.results).to.have.members(
        sequelize.models.Role.defaultRoles
      );

      return Promise.resolve();
    });

    it("should return 401 unauthorized if not an admin", async () => {
      // Create a user and a JWT access token for that user
      scope.user = await sequelize.models.User.create({
        email: `user@example.com`,
      });
      scope.accessToken = await scope.user.generateAccessToken();

      // Make the request
      const { statusCode, result } = await server.inject({
        method: "get",
        url: `${uri}/roles`,
        headers: {
          authorization: `Bearer ${scope.accessToken}`,
        },
      });

      // Check the response
      expect(statusCode).to.equal(401);
      expect(result.message).to.exist;
      expect(result.message).to.deep.equal("Unauthorized");

      return Promise.resolve();
    });
  });
});
