import Button from "@/components/common/button";
import Dialog from "@/components/common/dialog";
import { useState } from "react";
import AddProductForm from "../addProductForm";
import type { Category } from "@/types/products";

interface Props {
  categories: Category[];
}

const AddProduct = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  return (
    <>
      <Button
        label="Add Product"
        onClick={handleDialogOpen}
        className="bg-orange-500"
      />
      <Dialog
        handleClose={handleDialogClose}
        header="Add Product"
        isOpen={isOpen}
      >
        <AddProductForm
          handleClose={handleDialogClose}
          categories={categories}
        />
      </Dialog>
    </>
  );
};

export default AddProduct;
