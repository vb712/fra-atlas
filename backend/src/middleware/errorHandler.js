// Centralized error handler to ensure consistent error responses
function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  if (status >= 500) {
    console.error("[error]", err);
  }

  res.status(status).json({
    error: message,
    details: err.details || undefined,
  });
}

module.exports = errorHandler;
