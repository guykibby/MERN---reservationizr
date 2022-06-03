const express = require("express");
const cors = require("cors");
const RestaurantModel = require("./models/RestaurantModel");
const formatRestaurant = require("./utils/formatRestaurant");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    return res.status(200).send(restaurants.map(formatRestaurant));
  } catch (e) {
    next(e);
  }
});

module.exports = app;
