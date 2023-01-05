const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const connectToDatabase = require("./configs/database");
const errorHandler = require("./middlewares/error");
require("./passport");

dotenv.config({ path: "./configs/config.env" });

connectToDatabase();

const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/review");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    credentials: true,
  })
);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

const oneDay = 1000 * 60 * 60 * 24;
app.enable("trust proxy", true);
app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,
      httpOnly: false,
      secure: false,
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/user", userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
