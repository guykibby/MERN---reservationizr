const formatReservation = require("./formatReservation");

describe("formatReservation", () => {
  it("should return reservation object with altered id property", () => {
    const testObject = {
      _id: "629eb617c6f7a393fcf2ba96",
      __v: "this-should-be-removed",
      partySize: 5,
      date: "2029-06-29T00:00:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    };
    const expectedObject = {
      id: "629eb617c6f7a393fcf2ba96",
      partySize: 5,
      date: "2029-06-29T00:00:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    };

    expect(formatReservation(testObject)).toEqual(expectedObject);
  });
});
