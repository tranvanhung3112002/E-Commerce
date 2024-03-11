import { IProduct } from "../../types/Models";

export function SearchProduct(listProduct: IProduct[], value: string) {
  return listProduct.filter(
    (item) =>
      item.name.toLowerCase().includes(value) ||
      item.categoryName.toLowerCase().includes(value)
  );
}
