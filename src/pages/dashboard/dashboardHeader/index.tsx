// src/pages/dashboard/dashboardHeader.tsx
import React, { useMemo } from "react";
import AddProduct from "../addProduct";
import SearchInput from "@/components/common/searchInput";
import FormSelectPlain, {
  type IFormSelectPlainOptions,
} from "@/components/forms/formSelectPlain";
import type { Category } from "@/types/products";

interface Props {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  category: string;
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[];
}

const DashboardHeader = ({
  handleSearch,
  search,
  category,
  handleSelectCategory,
  categories,
}: Props) => {
  const _categories = useMemo<IFormSelectPlainOptions[]>(() => {
    const mappedCategories = categories.map((category) => {
      return {
        label: category.name,
        value: category.name,
      };
    });

    return [
      {
        label: "All",
        value: "",
      },
      ...mappedCategories,
    ];
  }, [categories]);

  return (
    <div className="mb-10 mt-4 flex flex-col md:flex-row flex-wrap justify-end items-center gap-5">
      <div className="w-full md:w-auto md:flex-1 md:max-w-[300px]">
        <SearchInput onChange={handleSearch} value={search} />
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row gap-5">
        <div className="w-[150px]">
          <FormSelectPlain
            name="category"
            onChange={handleSelectCategory}
            value={category}
            addMargin={false}
            options={_categories}
          />
        </div>
        <AddProduct categories={categories} />
      </div>
    </div>
  );
};

export default DashboardHeader;
