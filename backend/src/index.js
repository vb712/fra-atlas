const app = require("./app");
const env = require("./config/env");

const server = app.listen(env.port, () => {
  console.log(`[server] Listening on port ${env.port}`);
});

const shutdown = (signal) => {
  console.log(`[server] Received ${signal}. Closing server.`);
  server.close(() => {
    console.log("[server] Shutdown complete");
    process.exit(0);
  });
};

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});

module.exports = server;
