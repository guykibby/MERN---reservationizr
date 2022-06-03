const request = require("supertest");
const app = require("./app");

const restaurants = [
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

describe("app", () => {
  it("should GET /restaurants returns all restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toEqual(restaurants);
    expect(response.status).toEqual(200);
  });
  //   it("should GET /reservations/507f1f77bcf86cd799439011 return single reservation ", async () => {
  //     const response = await request(app).get(
  //       "/reservations/507f1f77bcf86cd799439011"
  //     );
  //     expect(response.body).toEqual(reservations[0]);

  //     expect(response.status).toEqual(200);
  //   });

  //   it("should GET /reservations/614abf0a93ee792ac6 return error ID invalid", async () => {
  //     const response = await request(app).get("/reservations/614abf0a93ee792ac6");
  //     expect(response.body).toEqual({
  //       message: "id provided is invalid",
  //     });

  //     expect(response.status).toEqual(400);
  //   });
  //   it("should GET /reservations/614abf0a93e8e80ace792a77 return error ID not found", async () => {
  //     const response = await request(app).get(
  //       "/reservations/614abf0a93e8e80ace792a77"
  //     );
  //     expect(response.body).toEqual({
  //       message: "id not found",
  //     });

  //     expect(response.status).toEqual(404);
  //   });
});
