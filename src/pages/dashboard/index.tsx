/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import type { Category, Product } from "@/types/products";
import Container from "@/components/common/container";
import DashboardHeader from "./dashboardHeader";
import ProductsGrid from "./productsGrid";
import {
  getCategoriesService,
  getProductsService,
} from "@/services/product-service";
import usePagination from "@/hooks/usePagination";

const POSTS_PER_PAGE = 9;

const DashboardScreen = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isSearchValid = product?.title
        ?.toLowerCase()
        ?.includes(search?.toLowerCase());
      const isCategoryValid = product?.category?.name
        ?.toLowerCase()
        .includes(category?.toLowerCase());

      return isSearchValid && isCategoryValid;
    });
  }, [category, products, search]);

  const paginatedData = usePagination(filteredProducts, {
    postsPerPage: POSTS_PER_PAGE,
  });
  const { setCurrentPage } = paginatedData;

  useEffect(() => {
    handleFetchProducts();
    handleFetchCategory();
  }, []);

  const handleFetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await getProductsService();
      setProducts(res || []);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFetchCategory = async () => {
    try {
      const res = await getCategoriesService();
      setCategories(res || []);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Container>
        <DashboardHeader
          handleSearch={handleSearch}
          search={search}
          category={category}
          handleSelectCategory={handleSelectCategory}
          categories={categories}
        />
        <ProductsGrid
          products={filteredProducts}
          handleFetchProducts={handleFetchProducts}
          isError={isError}
          isLoading={isLoading}
          paginatedData={paginatedData}
        />
      </Container>
    </>
  );
};

export default DashboardScreen;
