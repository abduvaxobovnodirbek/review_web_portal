const mongoose = require("mongoose");

const UserBasketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user must be defined"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: [true, "user must be defined"],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserBasket", UserBasketSchema);
