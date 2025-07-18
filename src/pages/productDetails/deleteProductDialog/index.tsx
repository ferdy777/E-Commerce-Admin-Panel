import Button from "@/components/common/button";
import { DialogBody, DialogFooter } from "@/components/common/dialog";
import { deleteProductService } from "@/services/product-service";
import { useState } from "react";
import { Path } from "@/navigations/routes";
import { toast } from "react-toastify";

interface Props {
  handleClose: () => void;
  productId: number;
  navigate: (path: string) => void;
  onDeleted?: () => void;
}

const DeleteProductDialog = ({
  handleClose,
  productId,
  navigate,
  onDeleted,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteProductService(productId);
      if (result) {
        toast.success("Product deleted!");
        onDeleted?.();
        navigate(Path.Products);
      } else {
        toast.error("Delete failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <DialogBody>
        <p>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
      </DialogBody>
      <DialogFooter className="flex gap-3 justify-center items-center">
        <Button
          label="Cancel"
          onClick={handleClose}
          variant="primary-outline"
        />
        <Button
          label="Delete"
          onClick={handleDelete}
          variant="danger"
          // className="bg-red-500"
          loading={loading}
        />
      </DialogFooter>
    </>
  );
};

export default DeleteProductDialog;
