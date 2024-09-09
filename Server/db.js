import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  const URL = process.env.URL;
  try {
    mongoose.connect(URL).then(() => console.log("connected"));
  } catch (e) {
    console.log("Error=> " + e);
  }
};

Connection();
// export { Connection };
