import { Product } from "../types/product";
import productsData from "../data/Products.json";

export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as unknown as Product[]);
    }, 200);
  });
}