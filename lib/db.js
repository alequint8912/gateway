const mongoose = require("mongoose");

const mongoDBUrl = `mongodb+srv://admin:admin@cluster0.2zxew.mongodb.net/gateway?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = mongoose;
