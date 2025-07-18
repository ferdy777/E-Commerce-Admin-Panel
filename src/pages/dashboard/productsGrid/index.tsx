import type { Product } from "@/types/products";
import ProductCard from "../productCard";
import Pagination from "@/components/common/pagination";
import Typography from "@/components/common/typography";
import Button from "@/components/common/button";
import { type IUsePaginationResponse } from "@/hooks/usePagination";
import Loader from "@/components/common/loader";

interface Props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  handleFetchProducts: () => void;
  paginatedData: IUsePaginationResponse<Product>;
}

const ProductsGrid = ({
  isLoading,
  isError,
  handleFetchProducts,
  paginatedData,
}: Props) => {
  const {
    currentPage,
    dataLength,
    numOfPagePosts,
    setCurrentPage,
    slicedPosts,
  } = paginatedData;

  if (isLoading) {
    return <Loader message="Loading Products..." />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <Typography variant="heading-5" className="mb-4">
          Failed to load products.
        </Typography>
        <Button onClick={handleFetchProducts} label="Retry" />
      </div>
    );
  }

  return (
    <div className="pb-20">
      {slicedPosts.length ? (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {slicedPosts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={dataLength}
            postsPerPage={numOfPagePosts}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center py-20">
          <Typography variant="heading-4" className="text-primary">
            No product found
          </Typography>
          <Typography>No product match this selection</Typography>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
