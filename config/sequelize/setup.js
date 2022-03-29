"use strict";

const Sequelize = require("sequelize");
const config = require("../config.json")[process.env.NODE_ENV];

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: "postgres",
    host: config.host,
    port: config.port || 5432,
    logging: () => {
      if (!process.env.SILENT_OPS) console.log;
    },
  }
);

sequelize
  .authenticate()
  .then(() =>
    console.log(`
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          Database connection has been established successfully
                   process.env.NODE_ENV: ${process.env.NODE_ENV}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  `)
  )
  .catch((err) => console.log("Unable to connect to the database: " + err));


sequelize.sync();

module.exports = sequelize;
