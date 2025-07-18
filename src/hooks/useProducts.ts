import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductsPageService,
  getProductsCountService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  getRelatedProductsService,
} from "@/services/product-service";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/products";

export const useProductsPage = (
  token: string | undefined,
  offset: number,
  limit: number,
  title: string
) =>
  useQuery<Product[]>({
    queryKey: ["products-page", offset, limit, token, title],
    queryFn: () => getProductsPageService(token, offset, limit, title),
    staleTime: 60_000,
  });

export const useProductsCount = (token?: string) =>
  useQuery<number>({
    queryKey: ["products-count", token],
    queryFn: () => getProductsCountService(token),
    staleTime: 5 * 60_000,
  });

export const useProduct = (id: number | undefined, token?: string) =>
  useQuery<Product>({
    queryKey: ["product", id, token],
    queryFn: () => getProductByIdService(id!, token),
    enabled: id !== undefined,
  });

export const useRelatedProducts = (id: number | undefined, token?: string) =>
  useQuery<Product[]>({
    queryKey: ["related-products", id, token],
    queryFn: () => getRelatedProductsService(id!, token),
    enabled: id !== undefined,
  });

export const useCreateProduct = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      createProductService(payload, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products-page"] });
      qc.invalidateQueries({ queryKey: ["products-count"] });
    },
  });
};

export const useUpdateProduct = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateProductPayload;
    }) => updateProductService(id, payload, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products-page"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useDeleteProduct = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProductService(id, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products-page"] });
      qc.invalidateQueries({ queryKey: ["products-count"] });
    },
  });
};
