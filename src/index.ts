import { sum } from "./util/sum";

interface Price {
  value: number;
  currency: "EUR";
}

interface BasketItem {
  reference: string;
  price: Price;
  quantity: number;
}

export interface BasketApi {
  getAllItems(): BasketItem[];
}

function computeSubTotal({ price: { value }, quantity }: BasketItem): number {
  return value * quantity;
}

export function computeTotalPrice(api: BasketApi): number {
  try {
    return api.getAllItems().map(computeSubTotal).reduce(sum, 0);
  } catch (error) {
    throw Error("The items could not be retrieved from the server.");
  }
}
