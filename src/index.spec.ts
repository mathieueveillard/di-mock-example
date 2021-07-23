import { BasketApi, computeTotalPrice } from ".";

it("should compute the total price of a basket", function () {
  // GIVEN
  const mockedApi: BasketApi = {
    getAllItems: () => [
      {
        reference: "Clean Code",
        price: {
          value: 40,
          currency: "EUR",
        },
        quantity: 1,
      },
      {
        reference: "Le Guide du Routard / Le Perche",
        price: {
          value: 15,
          currency: "EUR",
        },
        quantity: 2,
      },
    ],
  };

  // WHEN
  const actual: number = computeTotalPrice(mockedApi);

  // THEN
  expect(actual).toEqual(40 + 15 * 2);
});

it("should handle API errors", function () {
  // GIVEN
  const mockedApi: BasketApi = {
    getAllItems: () => {
      throw Error("HTTP 500: internal error.");
    },
  };

  // WHEN
  // THEN
  expect(() => computeTotalPrice(mockedApi)).toThrowError("The items could not be retrieved from the server.");
});
