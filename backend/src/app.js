const express = require("express");
const env = require("./config/env");
const routes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: env.nodeEnv });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
