import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import { Link } from "react-router-dom";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `${process.env.REACT_APP_API_URL}/restaurants/${id}`;
      const response = await fetch(fetchUrl);

      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }

      const data = await response.json();
      setRestaurant(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isNotFound) {
    return (
      <div className="reservationItem">
        <p className="error">Sorry! We can't find that restaurant</p>
        <Link to="/reservations" className="btn btn2">
          &larr; Back to reservations
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="restaurantItem2" key={restaurant.id}>
        <img className="img1" src={restaurant.image} alt={restaurant.name} />
        <div>
          <h1 className="restaurantName2">{restaurant.name}</h1>
          <p className="restaurantDescription2">{restaurant.description}</p>
        </div>
      </section>
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
