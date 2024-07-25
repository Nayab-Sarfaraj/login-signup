const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    // Or:

    await mongoose.connect("mongodb://127.0.0.1:27017/fun");
    console.log("successfully connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectToDB;
