"use strict";

const _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/setup.js");

const Role = sequelize.define("Role", {
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      is: {
        args: /^[a-z0-9\-\_]+[a-z0-9\-\_\s]+[a-z0-9\-\_]$/,
        msg: "Role name characters must only consist of lowercase letters, numbers, -, or _ and must not start or end with a space",
      },
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at",
  },
});

/**
 * Omit sensitive values whenever toJSON is called
 */
Role.prototype.toJSON = function () {
  return _.omit(this.get(), Role.restrictedAttrs);
};

/**
 * Create a row in the database for each default role
 */
Role.createDefaultRoles = async function () {
  return Promise.all(
    _.map(Role.defaultRoles, async (roleName) => {
      return Role.create({
        name: roleName,
      });
    })
  );
};

/**
 * If a user is an admin, find and return all roles
 *
 * @param {Object} user - Sequelize user instance
 * @returns {Array}
 */
Role.findAllWithPermission = async function ({ user }) {
  // Check that the user is an admin
  const adminRole = await sequelize.models.UserRole.findOne({
    where: { userId: user.id, roleId: 1 },
  });

  // If not an admin, reject the request
  if (!adminRole) throw new Error("Unauthorized");

  // Find and return all roles
  const roles = await Role.findAll();
  return {
    results: _.map(roles, "name"),
  };
};

Role.restrictedAttrs = ["id", "createdAt", "updatedAt"];

Role.defaultRoles = Object.freeze([
  "admin",
  "author",
  "contributor",
  "editor",
  "member",
  "owner",
  "subscriber",
  "support",
  "viewer",
]);

module.exports = Role;
