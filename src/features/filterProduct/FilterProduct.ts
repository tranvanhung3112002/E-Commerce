import { IProduct } from "../../types/Models";

export function FilterByPrice(listProduct: IProduct[], arrPrice: number[]) {
  return listProduct.filter(
    (item) =>
      item.price - (item.discount * item.price) / 100 >= arrPrice[0] &&
      item.price - (item.discount * item.price) / 100 <= arrPrice[1]
  );
}

export function colortFilterArray(listProduct: IProduct[]) {
  const allColor = listProduct.reduce(
    (arrayReduce: Set<string>, currentValue) => {
      currentValue.color.forEach((color) => {
        arrayReduce.add(color);
      });
      return arrayReduce;
    },
    new Set<string>()
  );

  return Array.from(allColor);
}

export function sizeFilterArray(listProduct: IProduct[]) {
  const allSize = listProduct.reduce(
    (arrayReduce: Set<string>, curentValue) => {
      curentValue.sizeProduct.forEach((size) => {
        arrayReduce.add(size);
      });
      return arrayReduce;
    },
    new Set<string>()
  );

  return Array.from(allSize);
}

export function FilterProductColor(listProduct: IProduct[], color: string) {
  return listProduct.filter((item) => item.color.includes(color));
}

export function FilterProductSize(listProduct: IProduct[], size: string) {
  return listProduct.filter((item) => item.sizeProduct.includes(size));
}

export function FilterProductOnSale(listProduct: IProduct[]) {
  return listProduct.filter((item) => item.discount !== 0);
}

export function FilterProductInStock(listProduct: IProduct[]) {
  return listProduct.filter((item) => item.quantityProduct !== 0);
}
