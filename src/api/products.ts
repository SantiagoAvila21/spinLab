import { Product } from "../types/product";

const API_URL = "http://localhost:5297/api/products"; 

export async function fetchProducts(
  search?: string,
  category?: string,
  brand?: string,
  sort?: string
): Promise<Product[]> {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (brand) params.append("brand", brand);
  if (sort) params.append("sort", sort);

  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener productos");

  return response.json();
}
