const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://mohitsaharan407:Mohit2908@cluster0.d0iddii.mongodb.net/GoFood?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    // Fetch data from the "food_items" collection
    const fetchedData = mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("food_data");
    const catData = await foodCategory.find({}).toArray();

    global.foodItems = data;
    global.foodCategory = catData;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
