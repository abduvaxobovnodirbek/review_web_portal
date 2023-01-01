const mongoose = require("mongoose");
const { importData } = require("../seeder");
//process.env.MONGO_URI
const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost:27017/itransition", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected`.cyan.underline.bold);
  return importData();
};

module.exports = connectToDatabase;
