import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { Link } from "react-router-dom";

const listdelete = [
  {
    id: "616005cae3c8e880c13dc0b9",
    name: "Curry Place",
    description:
      "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
    image: "https://i.ibb.co/yftcRcF/indian.jpg",
  },
  {
    id: "616005e26d59890f8f1e619b",
    name: "Thai Isaan",
    description:
      "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
    image: "https://i.ibb.co/HPjd2jR/thai.jpg",
  },
  {
    id: "616bd284bae351bc447ace5b",
    name: "Italian Feast",
    description:
      "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
    image: "https://i.ibb.co/0r7ywJg/italian.jpg",
  },
];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_API_URL}/restaurants`
    //   );
    //   const data = await response.json();
    setRestaurants(listdelete);
    // setIsLoading(false);
    // };
    // fetchData();
  }, []);

  return (
    <>
      <h1>Restuarants</h1>
      <ul className="restuarantList">
        {restaurants.map((restaurant) => {
          return (
            <li className="restaurantItem" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} />
              <h2 className="restaurant-name">{restaurant.name}</h2>
              <p className="property-address">{restaurant.description}</p>
              <Link
                className="restaurantLink link"
                to={`/restaurants/${restaurant.id}`}
              >
                Reserve now &rarr;
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
