const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from backend/.env if present
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 4000,
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
};

if (!config.databaseUrl) {
  console.warn("[env] DATABASE_URL is not set. Database operations will fail until configured.");
}

if (!config.jwtSecret) {
  console.warn("[env] JWT_SECRET is not set. Authentication tokens will be insecure until configured.");
}

module.exports = config;
