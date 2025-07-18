import Dialog from "@/components/common/dialog";
import DeleteProductDialog from "../deleteProductDialog";
import type { NavigateFunction } from "react-router-dom";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  productId: number;
  navigate: NavigateFunction;
}

const DeleteDialog = ({ isOpen, handleClose, productId, navigate }: Props) => {
  return (
    <Dialog handleClose={handleClose} header="Delete Product" isOpen={isOpen}>
      <DeleteProductDialog
        handleClose={handleClose}
        productId={productId}
        navigate={navigate}
      />
    </Dialog>
  );
};

export default DeleteDialog;
