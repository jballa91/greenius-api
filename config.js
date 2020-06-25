const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/greenius-api";

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once("open", () =>
  console.log(`connected to mongo at ${url}`)
);
