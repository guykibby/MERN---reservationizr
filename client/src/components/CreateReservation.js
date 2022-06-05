import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  const [guestNumber, setGuestNumber] = useState(2);
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit} className="reservationForm">
        <h3>{`Reserve ${restaurantName}`}</h3>
        <label htmlFor="guestNumber">Number of guests</label>
        <input
          type="number"
          id="guestNumber"
          className="inputArea"
          value={guestNumber}
          onChange={(event) => {
            setGuestNumber(event.target.value);
          }}
          required
        />
        <label htmlFor="DatePicker">Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="inputArea"
          showTimeSelect
          dateFormat="Pp"
          id="DatePicker"
        />

        <button className="btn1">
          {/* disabled={isLoading} */}
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateReservation;
