const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    review_name: {
      type: String,
      required: [true, "Please add a review name"],
    },
    description: {
      type: String,
      minLength: 100,
      required: [true, "Please add a description"],
    },
    reviewed_art: {
      type: String,
      required: [true, "Please add a reviewed_art"],
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Please add a review category"],
    // },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please add a review owner"],
    },
    tags: {
      type: [String],
      required: [true, "Please add a review tag"],
    },
    authorGrade: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: [true, "Please add a grade for reviewed_art"],
    },
    imageList: {
      type: [String],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
