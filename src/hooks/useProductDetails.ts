import { useEffect, useState } from "react";
import { getProductByIdService } from "@/services/product-service";
import type { Product } from "@/types/products";

export const useProductDetails = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) fetchProduct(Number(id));
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await getProductByIdService(productId);
      setProduct(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = (product: Product) => {
    setProduct(product);
  };

  return { product, isLoading, isError, handleUpdateProduct };
};
