const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectToDatabase = require("./configs/database");
const errorHandler = require("./middlewares/error");

// Load env
dotenv.config({ path: "./configs/config.env" });
// Connect to database
connectToDatabase();

const app = express();

// Setting Body parser
app.use(express.json());

// Show logs in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
