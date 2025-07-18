import Button from "@/components/common/button";
import { DialogBody, DialogFooter } from "@/components/common/dialog";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import { updateProductService } from "@/services/product-service";
import type { Shape } from "@/validations/constants/shape";
import * as yup from "yup";
import type { Product } from "@/types/products";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  handleClose: () => void;
  product: Product;
  onUpdated?: () => void;
  handleUpdateProduct: (product: Product) => void;
}

interface IUpdateProductForm {
  title: string;
  price: string;
  description: string;
  images: string;
}

const validationSchema = yup.object().shape<Shape<IUpdateProductForm>>({
  title: yup.string().required("Please enter title"),
  price: yup.string().required("Please enter price"),
  description: yup.string().required("Please enter description"),
  images: yup.string().required("Please enter image URL"),
});

const UpdateProductForm = ({
  handleClose,
  product,
  onUpdated,
  handleUpdateProduct,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const initialValues: IUpdateProductForm = {
    title: product.title,
    price: String(product.price),
    description: product.description,
    images: product.images?.[0] || "",
  };

  const handleSubmit = async (values: IUpdateProductForm) => {
    try {
      setLoading(true);
      const res = await updateProductService(product.id, {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        images: [values.images],
      });

      handleUpdateProduct(res);
      toast.success("Product updated!");
      handleClose();
      onUpdated?.();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <DialogBody>
        <FormInput name="title" label="Title" />
        <FormInput name="description" label="Description" />
        <FormInput name="price" type="number" label="Price" />
        <FormInput name="images" label="Image URL" />
      </DialogBody>
      <DialogFooter>
        <Button label="Update" type="submit" loading={loading} fullWidth />
      </DialogFooter>
    </Form>
  );
};

export default UpdateProductForm;
