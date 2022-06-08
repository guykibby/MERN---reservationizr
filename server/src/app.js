const express = require("express");
const cors = require("cors");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const formatRestaurant = require("./utils/formatRestaurant");
const formatReservation = require("./utils/formatReservation");
const mongoose = require("mongoose");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const checkJwt = auth({
  audience: "https://Reservationizr/api",
  issuerBaseURL: `https://dev-mttqdp1o.us.auth0.com/`,
});

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res, next) => {
  //   try {
  const restaurants = await RestaurantModel.find({});
  return res.status(200).send(restaurants.map(formatRestaurant));
  //   } catch (e) {
  //     next(e);
  //   }
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
        error: "restaurant not found",
      });
    }
  } else {
    return response.status(400).send({ error: "invalid id provided" });
  }
});

app.post(
  "/reservations",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      restaurantName: Joi.string().required(),
      partySize: Joi.number().min(1).required(),
      date: Joi.date().required().greater("now"),
    }),
  }),
  async (req, res, next) => {
    try {
      const { body } = req;
      body.userId = req.auth.payload.sub;

      const newReservation = await ReservationModel.create(body);

      return res.status(201).send(formatReservation(newReservation));
    } catch (error) {
      next(error);
    }
  }
);

app.get("/reservations", checkJwt, async (req, res) => {
  const list = await ReservationModel.find({
    userId: req.auth.payload.sub,
  });
  const reservations = list.map(formatReservation);
  res.status(200).send(reservations);
});

app.get("/reservations/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  const isIdValid = mongoose.Types.ObjectId.isValid(id);

  if (isIdValid) {
    const reservation = await ReservationModel.findById(id);
    if (reservation) {
      if (req.auth.payload.sub !== reservation.userId) {
        return res.status(403).send({
          error: "user does not have permission to access this reservation",
        });
      } else {
        return res.send(formatReservation(reservation));
      }
    } else {
      return res.status(404).send({ error: "not found" });
    }
  } else {
    return res.status(400).send({
      error: "invalid id provided",
    });
  }
});

app.use(errors());

module.exports = app;
