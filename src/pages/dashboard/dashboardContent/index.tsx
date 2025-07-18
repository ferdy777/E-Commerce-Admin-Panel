import React from "react";
import Container from "@/components/common/container";
import DashboardHeader from "../dashboardHeader";
import ProductsGrid from "../productsGrid";
import type { Product, Category } from "@/types/products";
import type { IUsePaginationResponse } from "@/hooks/usePagination";

interface Props {
  isLoading: boolean;
  isError: boolean;
  handleFetchProducts: () => void;
  products: Product[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  category: string;
  categories: Category[];
  paginatedData: IUsePaginationResponse<Product>;
}

const DashboardContent = ({
  isLoading,
  isError,
  handleFetchProducts,
  products,
  handleSearch,
  search,
  handleSelectCategory,
  category,
  categories,
  paginatedData,
}: Props) => {
  return (
    <Container>
      <DashboardHeader
        handleSearch={handleSearch}
        search={search}
        category={category}
        handleSelectCategory={handleSelectCategory}
        categories={categories}
      />

      <ProductsGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        handleFetchProducts={handleFetchProducts}
        paginatedData={paginatedData}
      />
    </Container>
  );
};

export default DashboardContent;
