const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const gatewayAPI = require("./routes/gateway.router");
const deviceAPI = require("./routes/device.router");

const {
  errorHandler,
  logErrors,
  wrapErrors,
} = require("./utils/middleware/errorHandler");
const notFoundHandler = require("./utils/middleware/notFoundHandler");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//API
gatewayAPI(app);
deviceAPI(app);

// Error middlewares
//app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//Catch 404
app.use(notFoundHandler);

module.exports = app;
