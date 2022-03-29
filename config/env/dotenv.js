const path = require("path");

// http://gunargessner.com/gcloud-env-vars/
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: path.join(__dirname, "test.env") });
} else {
  require("dotenv").config({ path: path.join(__dirname, "development.env") });
}

module.exports = {};
