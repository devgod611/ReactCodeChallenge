"use strict";

const _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/setup.js");

const UserRole = sequelize.define("UserRole", {
  roleId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    field: "role_id",
    unique: "UserRoles_role_id_user_id",
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    field: "user_id",
    unique: "UserRoles_role_id_user_id",
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

module.exports = UserRole;
