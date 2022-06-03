const express = require("express");
const cors = require("cors");
const RestaurantModel = require("./models/RestaurantModel");
const formatRestaurant = require("./utils/formatRestaurant");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await RestaurantModel.find({});
    return res.status(200).send(restaurants.map(formatRestaurant));
  } catch (e) {
    next(e);
  }
});

app.get("/restaurants/:id", async (request, response) => {
  const { id } = request.params;
  const isIdValid = mongoose.Types.ObjectId.isValid(id);
  if (isIdValid) {
    const restaurant = await RestaurantModel.findById(id);

    if (restaurant) {
      return response.send(formatRestaurant(restaurant));
    } else {
      return response.status(404).send({
        message: "The restaurant trying to be retrieved does not exist",
      });
    }
  } else {
    return response.status(400).send({ message: "Invalid ID is provided" });
  }
});

module.exports = app;
