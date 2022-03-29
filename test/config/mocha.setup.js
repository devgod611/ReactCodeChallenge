const { server } = require("../../server.js");

after(async () => {
  return new Promise((resolve, reject) => {
    server.stopRun(() => {
      resolve();
    });
  });
});
