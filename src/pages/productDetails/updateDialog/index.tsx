import Dialog from "@/components/common/dialog";
import UpdateProductForm from "../updateProductForm";
import type { Product } from "@/types/products";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  product: Product;
  handleUpdateProduct: (product: Product) => void;
}

const UpdateDialog = ({
  isOpen,
  handleClose,
  product,
  handleUpdateProduct,
}: Props) => {
  return (
    <Dialog handleClose={handleClose} header="Update Product" isOpen={isOpen}>
      <UpdateProductForm
        handleClose={handleClose}
        handleUpdateProduct={handleUpdateProduct}
        product={product}
      />
    </Dialog>
  );
};

export default UpdateDialog;
