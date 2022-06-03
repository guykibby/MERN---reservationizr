const mongoose = require("mongoose");

const RestaurantModel = mongoose.model(
  "Restaurant",
  mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  })
);

module.exports = RestaurantModel;
