// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Import Routes
const UserRoutes = require("./routes/UserRoutes");

// Initializations
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Config
app.set("port", process.env.PORT || 3001);

// Routes
app.use("/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
