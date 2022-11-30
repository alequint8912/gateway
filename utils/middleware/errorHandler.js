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
  console.log("ERROR WRAP: ", error);

  if (!error.isBoom) {
    next(boom.badImplementation(error));
  }

  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.log("ERROR HANDLER: ", error);

  const {
    output: { statusCode, payload },
    data,
  } = error;

  res.status(statusCode);
  res.json(
    withErrorStack(
      {
        ...payload,
        ...(data?.details && { details: data.details }),
        ...(data?.errorCode && { errorCode: data.errorCode }),
      },
      error.stack
    )
  );
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
