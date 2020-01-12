const mongoose = require("mongoose");

// TODO : YOGENDRA
let URL = "localhost:1234/incred";

const connectDB = async () => {
  const conn = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
