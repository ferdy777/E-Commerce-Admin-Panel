import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "@/components/common/container";
import Typography from "@/components/common/typography";
import { useProductDetails } from "@/hooks/useProductDetails";
import BackButton from "./backButton";
import ProductContent from "./productContent";
import UpdateDialog from "./updateDialog";
import DeleteDialog from "./deleteDialog";
import Loader from "@/components/common/loader";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { product, isLoading, isError, handleUpdateProduct } =
    useProductDetails(id);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) {
    return <Loader message="Loading product details..." />;
  }

  if (isError || !product) {
    return (
      <Container>
        <BackButton />
        <Typography className="text-primary text-center">
          Failed to load product details.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="pb-20">
      <BackButton />
      <ProductContent
        product={product}
        onUpdate={() => setIsUpdateOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
      />
      <UpdateDialog
        isOpen={isUpdateOpen}
        handleClose={() => setIsUpdateOpen(false)}
        product={product}
        handleUpdateProduct={handleUpdateProduct}
      />
      <DeleteDialog
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        productId={product.id}
        navigate={navigate}
      />
    </Container>
  );
};

export default ProductDetails;
