import "./ReservationList.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationList = () => {
  const [reservationList, setReservationList] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      setReservationList(data);
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <>
      <ul className="reservationList">
        <h1>Upcoming reservations</h1>
        {reservationList.map((reservation) => {
          return (
            <li key={reservation.id} className="reservationListItem">
              <div className="reservationUnit">
                <p className="reservationDetail">
                  <b>{reservation.restaurantName}</b>
                </p>
                <p className="reservationDetail date">
                  {formatDate(reservation.date)}
                </p>
                <Link
                  className="reservationDetail link"
                  to={`/reservations/${reservation.id}`}
                >
                  View details &rarr;
                </Link>
              </div>
              <hr className="line" />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ReservationList;
