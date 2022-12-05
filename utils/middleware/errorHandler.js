const boom = require("@hapi/boom");

function withErrorStack(error, stack) {
  return { ...error, stack };

  //return error;
}

function logErrors(error, req, res, next) {
  console.log(error);
  next(error);
}

function wrapErrors(error, req, res, next) {
  if (!error.isBoom) {
    next(boom.badImplementation(error));
  }

  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  const {
    output: { statusCode, payload },
    data,
  } = error;

  res.status(statusCode);
  res.json({
    ...payload,
    ...(data?.errorCode && { errorCode: data.errorCode }),
  });
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
