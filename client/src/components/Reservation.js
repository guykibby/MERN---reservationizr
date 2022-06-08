import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }

      const data = await response.json();
      setReservation(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, getAccessTokenSilently]);

  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! We can't find that reservation</p>
        <Link to="/" className="btn btn-center">
          &larr; Back to reservations
        </Link>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="reservationItem">
      <h2>
        <b>{reservation.restaurantName}</b>
      </h2>
      <p className="date">{formatDate(reservation.date)}</p>
      <p className="reservationBorder">
        <b>Party size:</b>
        <b> {reservation.partySize}</b>
      </p>
      <Link to="/" className="btn1">
        &larr; Back to reservations
      </Link>
    </div>
  );
};

export default Reservation;
