require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const database = require("./config/database.config");
const api_router_v1 = require("./api/v1/routers/index.router");

// APIs
api_router_v1(app);

// Connect to the database and start the server
database.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }

  console.log(
    `Connected to MySQL database || Host: ${database.config.connectionConfig.host}, Port: ${database.config.connectionConfig.port}`
  );

  connection.release();

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
