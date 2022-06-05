import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        // "http://localhost:5001/restaurants"
        `${process.env.REACT_APP_API_URL}/restaurants`
      );
      console.log(response);

      const data = await response.json();

      console.log(data);

      setRestaurants(data);
      // setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Restaurants</h1>
      <ul className="restaurantList">
        {restaurants.map((restaurant) => {
          return (
            <li className="restaurantItem1" key={restaurant.id}>
              <img
                className="img1"
                src={restaurant.image}
                alt={restaurant.name}
              />
              <div>
                <h2 className="restaurantName1">{restaurant.name}</h2>
                <p className="restaurantDescription1">
                  {restaurant.description}
                </p>
                <Link className="btn1" to={`/restaurants/${restaurant.id}`}>
                  Reserve now &rarr;
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
