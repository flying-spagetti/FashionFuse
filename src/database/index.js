import mongoose from "mongoose";
require('dotenv').config(); 
const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = "mongodb+srv://gnanlopinti:UWbRwg3iufOweJKe@cluster0.36fzd8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(connectionUrl, configOptions);
    console.log("Ecommerce database connected successfully!");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
  }
};

export default connectToDB;
