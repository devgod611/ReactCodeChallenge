"use strict";

const _ = require("lodash");
const Boom = require("boom");
const fns = {};

fns.prefix = "v0";

fns.replyWith = {
  forbidden: (h) => Boom.forbidden(),
  unauthorized: (h) => Boom.unauthorized(),
  found: (record, h) => (record ? h.response(record) : Boom.notFound()),
  notFound: (h) => fns.replyWith.found(null, h),
  deleted: (record, h) => h.response({ message: "deleted", ...record }),
};

fns.handleErr = (err = {}, h) => {
  if (typeof err !== "object") err = { message: err };
  if (err.message === "Not Found") return Boom.notFound();
  if (err.message === "Unauthorized") return Boom.unauthorized();
  if (err.message === "Forbidden") return fns.replyWith.forbidden(h);
  if (err.message === "Usage Limit Exceeded")
    return Boom.tooManyRequests("Usage Limit Exceeded");

  const firstError = err.errors && err.errors[0];

  if (/^Sequelize/gi.test(err.name)) {
    err.message = "Problem with request";
  }

  return Boom.badRequest(err.message);
};

module.exports = fns;
