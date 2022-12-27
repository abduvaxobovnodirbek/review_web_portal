const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a review category"],
  },
});

module.exports = mongoose.model("Category", CategorySchema);
