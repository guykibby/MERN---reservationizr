import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `${process.env.REACT_APP_API_URL}/restaurants/${id}`;
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setRestaurant(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <li className="restaurantItem2" key={restaurant.id}>
        <img className="img1" src={restaurant.image} alt={restaurant.name} />
        <div>
          <h2 className="restaurantName2">{restaurant.name}</h2>
          <p className="restaurantDescription2">{restaurant.description}</p>
        </div>
      </li>

      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
