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
const searchRouter = require("./routes/search");

const Review = require("./models/Review");
const User = require("./models/User");

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

const oneDay = 1000 * 60 * 60 * 24;
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,
      httpOnly: false,
      secure: true,
      sameSite: "none",
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
app.use("/api/v1/search", searchRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

let io = require("./socket").init(server);
io.on("connection", (socket) => {
  socket.io = io;
  console.log("Client connected");

  socket.on("send_comment", async ({ text, reviewId, currentUserId }) => {
    const review = await Review.findById(reviewId)
      .populate("comments.user")
      .select("comments");

    const user = await User.findById(currentUserId);

    if (!review || !user) {
      return socket.emit("send_comment_result", false);
    }

    review.comments.push({
      user: currentUserId,
      text,
    });

    await review.save();
    const updated = await Review.findById(reviewId)
      .populate("comments.user")
      .select("comments");
    socket.nsp.to(reviewId).emit("updateComments", updated);
    return socket.emit("send_comment_result", true);
  });

  socket.on("getAllComments", async ({ reviewId }) => {
    await socket.join(reviewId);
    const review = await Review.findById(reviewId)
      .populate("comments.user")
      .select("comments");
    if (!review) {
      return socket.emit("getAllComments_result", null);
    }

    return socket.nsp.to(reviewId).emit("getAllComments_result", review);
  });
});
