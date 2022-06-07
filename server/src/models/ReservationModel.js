const mongoose = require("mongoose");

const ReservationModel = mongoose.model(
  "Reservation",
  mongoose.Schema({
    partySize: { type: Number, required: true },
    date: { type: Date, required: true },
    // userId: { type: String, required: true },
    restaurantName: { type: String, required: true },
  })
);

module.exports = ReservationModel;
