"use strict";

require("./env/dotenv.js");

module.exports = {
  test: {
    database: "api_challenge",
    username: process.env.DATABASE_USERNAME || "postgres",
    password: null,
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
};
