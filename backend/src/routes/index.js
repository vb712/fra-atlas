const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ service: "fra-atlas-api", timestamp: new Date().toISOString() });
});

module.exports = router;
