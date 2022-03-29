const _ = require("lodash");
const routeUtils = require("./utils.route.js");
const Role = require("../../models/role.js");

module.exports = [
  // Read all roles
  {
    method: "GET",
    path: "/roles",
    config: {
      description: "Read all roles",
      tags: ["Roles"],
    },
    handler: async (request, h) => {
      try {
        const { user } = request.auth.credentials;
        const res = await Role.findAllWithPermission({ user });
        return routeUtils.replyWith.found(res, h);
      } catch (err) {
        return routeUtils.handleErr(err, h);
      }
    },
  },
];
