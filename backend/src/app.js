// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();

// Import Routes
const UserRoutes = require("./routes/UserRoutes");
const PublicationRoutes = require("./routes/PublicationRoutes");

// Initializations
const app = express();
const store = MongoDBStore({
  uri: process.env.DB_HOST,
  collection: "sessions"
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave: true,
    saveUninitialized: true,
    store: store
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);
// Config
app.set("port", process.env.PORT || 3001);

// Routes
app.use("/users", UserRoutes);
app.use("/publications", PublicationRoutes);

module.exports = app;
