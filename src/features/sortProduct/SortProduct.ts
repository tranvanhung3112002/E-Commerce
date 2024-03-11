import { IProduct } from "../../types/Models";

export function SortLowToHigh(a: IProduct, b: IProduct) {
  return (
    a.price -
    (a.discount * a.price) / 100 -
    (b.price - (b.discount * b.price) / 100)
  );
}

export function SortHighToLow(a: IProduct, b: IProduct) {
  return (
    b.price -
    (b.discount * b.price) / 100 -
    (a.price - (a.discount * a.price) / 100)
  );
}

export function SortByAverageRating(a: IProduct, b: IProduct) {
  return a.rating.rate - b.rating.rate;
}

export function SortHot(a: IProduct) {
  if (a.state.includes("hot")) {
    return true;
  } else {
    return false;
  }
}
