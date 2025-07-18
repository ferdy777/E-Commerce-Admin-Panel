import AxiosConfig from "@/config/api";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  Category,
} from "@/types/products";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const getProductsService = async (): Promise<Product[]> => {
  return AxiosConfig.get("/products").then((res) => res.data);
};

export const getCategoriesService = async (): Promise<Category[]> => {
  return AxiosConfig.get("/categories").then((res) => res.data);
};

export async function getProductsPageService(
  token?: string,
  offset = 0,
  limit = 10,
  title?: string
): Promise<Product[]> {
  const url = `${BASE_URL}/products?offset=${offset}&limit=${limit}&title=${title}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) throw new Error(`Failed to fetch products page: ${res.status}`);
  return res.json();
}

export async function getProductsCountService(token?: string): Promise<number> {
  const url = `${BASE_URL}/products`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok)
    throw new Error(`Failed to fetch products for count: ${res.status}`);
  const data: Product[] = await res.json();
  return data.length;
}

export async function getProductByIdService(
  id: number,
  token?: string
): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  return res.json();
}

export async function getRelatedProductsService(
  id: number,
  token?: string
): Promise<Product[]> {
  const url = `${BASE_URL}/products/${id}/related`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok)
    throw new Error(`Failed to fetch related products ${id}: ${res.status}`);
  return res.json();
}

export async function createProductService(
  payload: CreateProductPayload,
  token?: string
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Create failed: ${res.status}`);
  return res.json();
}

export async function updateProductService(
  id: number,
  payload: UpdateProductPayload,
  token?: string
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
}

export async function deleteProductService(
  id: number,
  token?: string
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  const data = await res.json();
  return data === true;
}
