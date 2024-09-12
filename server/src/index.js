require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./config/database.config");
const api_router_v1 = require("./api/v1/routers/index.router");

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
var whitelist = ["http://localhost:4000", "http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes
api_router_v1(app);

// Connect to the database and start the server
database.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return process.exit(1); // Exit if there's a connection error
  }

  console.log(
    `Connected to MySQL database || Host: ${database.config.connectionConfig.host}, Port: ${database.config.connectionConfig.port}`
  );

  connection.release();

  // Start the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Simple route
app.get("/", (req, res) => {
  res.send("Hello world");
});
