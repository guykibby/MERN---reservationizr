import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  const [guestNumber, setGuestNumber] = useState(2);
  const [startDate, setStartDate] = useState(new Date());

  const { getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newReservation = {
      restaurantName,
      partySize: Number(guestNumber),
      date: startDate,
    };
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newReservation),
      }
    );
    if (response.ok) {
      navigate("/reservations");
    }
  };
  return (
    <div className="restaurantItem2">
      <form onSubmit={handleSubmit} className="reservationForm">
        <h2>{`Reserve ${restaurantName}`}</h2>
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

        <button className="btn">
          {/* disabled={isLoading} */}
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReservation;
