const mongoose = require("mongoose");
const { importData } = require("../seeder");
//process.env.MONGO_URI
//"mongodb://localhost:27017/itransition"
const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected`.cyan.underline.bold);
  return importData();
};

module.exports = connectToDatabase;
