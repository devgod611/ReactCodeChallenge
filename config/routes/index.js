"use strict";
/*
  POST	 /model	      models#create	  create the new model
  GET	   /model/:id   models#find	    read the one and only model resource
  GET	   /model       models#findAll  read all the model resources
  PUT    /model/:id   models#update	  update the one and only model resource
  DELETE /model/:id   models#delete   delete the model resource
*/
const userRoutes = require("./user.routes.js");
const roleRoutes = require("./role.routes.js");

const statusRoute = {
  method: "GET",
  path: "/status",
  handler: (request, h) => "OK",
  config: {
    auth: false,
  },
};

const routes = [].concat(userRoutes, roleRoutes, statusRoute);

module.exports = {
  routes,
  plugin: {
    v0: {
      name: "apiV0",
      version: "0.1.0",
      register: (server, options) => {
        server.route(routes);
      },
      routes: {
        prefix: "/v0",
      },
    },
  },
};
