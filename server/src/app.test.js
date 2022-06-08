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

const reservations = [
  {
    date: "2023-11-17T06:30:00.000Z",
    id: "507f1f77bcf86cd799439011",
    partySize: 4,
    restaurantName: "Island Grill",
    userId: "mock-user-id",
  },
  {
    date: "2023-12-03T07:00:00.000Z",
    id: "614abf0a93e8e80ace792ac6",
    partySize: 2,
    restaurantName: "Green Curry",
    userId: "mock-user-id",
  },
];

describe("app", () => {
  it("GET /restaurants should return all restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toEqual(restaurants);
    expect(response.status).toEqual(200);
  });
  it("GET /restaurants/616005cae3c8e880c13dc0b9 should return single restaurant", async () => {
    const response = await request(app).get(
      "/restaurants/616005cae3c8e880c13dc0b9"
    );
    expect(response.body).toEqual(restaurants[0]);

    expect(response.status).toEqual(200);
  });

  it("GET /restaurants/616005cae3c8e8dc0b1 should return invalid ID error", async () => {
    const response = await request(app).get("/restaurants/616005cae3c8e8dc0b1");
    expect(response.body).toEqual({
      error: "invalid id provided",
    });

    expect(response.status).toEqual(400);
  });
  it("GET /restaurants/616005cae3c8e880c13dc0b1 should return ID not found error", async () => {
    const response = await request(app).get(
      "/restaurants/616005cae3c8e880c13dc0b1"
    );
    expect(response.body).toEqual({
      error: "restaurant not found",
    });

    expect(response.status).toEqual(404);
  });
  test("POST /reservations creates a new reservation", async () => {
    const expectedStatus = 201;
    const body = {
      partySize: 5,
      date: "2029-06-29T00:00:00.000Z",
      restaurantName: "Island Grill",
    };

    await request(app)
      .post("/reservations")
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
        expect(response.body.userId).toBeTruthy();
      });
  });
  test("POST /reservations returns status 400 when empty object is provided", async () => {
    const expectedStatus = 400;
    const body = {};

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
  test("POST /reservations returns status 400 when an invalid date is provided", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: 5,
      date: "2020-06-29T00:00:00.000Z",
      restaurantName: "Island Grill",
    };

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
  test("POST /reservations returns status 400 when empty restaurantName string is provided", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: 5,
      date: "2020-06-29T00:00:00.000Z",
      restaurantName: "",
    };

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
  test("POST /reservations returns status 400 when partySize < 1 provided", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: 0,
      date: "2025-06-29T00:00:00.000Z",
      restaurantName: "Island Grill",
    };

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
  it("GET /reservations should return all users reservations", async () => {
    const response = await request(app).get("/reservations");
    expect(response.body).toEqual(reservations);
    expect(response.status).toEqual(200);
  });
  it("GET /reservations/507f1f77bcf86cd799439011 should return single reservation", async () => {
    const response = await request(app).get(
      "/reservations/507f1f77bcf86cd799439011"
    );
    expect(response.body).toEqual(reservations[0]);

    expect(response.status).toEqual(200);
  });

  it("GET /reservations/507f1f77bcf86cd should return error - invalid ID", async () => {
    const response = await request(app).get("/reservations/507f1f77bcf86cd");
    expect(response.body).toEqual({
      error: "invalid id provided",
    });

    expect(response.status).toEqual(400);
  });
  it("GET /reservations/507f1f77bcf86cd799439019 should return error - not found", async () => {
    const response = await request(app).get(
      "/reservations/507f1f77bcf86cd799439019"
    );
    expect(response.body).toEqual({
      error: "not found",
    });

    expect(response.status).toEqual(404);
  });
  it("GET /reservations/61679189b54f48aa6599a7fd should return single reservation", async () => {
    const response = await request(app).get(
      "/reservations/61679189b54f48aa6599a7fd"
    );
    expect(response.body).toEqual({
      error: "user does not have permission to access this reservation",
    });

    expect(response.status).toEqual(403);
  });
});
