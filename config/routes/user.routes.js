const _ = require("lodash");
const routeUtils = require("./utils.route.js");
const User = require("../../models/user.js");

module.exports = [
  // Read self
  {
    method: "GET",
    path: "/users/self",
    config: {
      description: "Read a user",
      tags: ["Users"],
    },
    handler: async (request, h) => {
      try {
        const { user } = request.auth.credentials;
        const res = await user.findComplete();
        return routeUtils.replyWith.found(res, h);
      } catch (err) {
        return routeUtils.handleErr(err, h);
      }
    },
  },
  {
    method: "GET",
    path: "/users/:userId",
    config: {
      description: "Read a user by user id",
      tags: ["Users"],
    },
    handler: async (request, h) => {
      try {
        const { user } = request.auth.credentials;
        const res = await user.findOne({where: {"uuid": req.params.userId}});

        return routeUtils.replyWith.found(res, h);
      } catch (err) {
        return routeUtils.handleErr(err, h);
      }
    },
  },
];
