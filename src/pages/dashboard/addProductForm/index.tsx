import Button from "@/components/common/button";
import { DialogBody, DialogFooter } from "@/components/common/dialog";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import FormSelect from "@/components/forms/formSelect";
import { useCreateProduct } from "../../../hooks/useProducts";
import type { Shape } from "@/validations/constants/shape";
import * as yup from "yup";
import type { Category } from "@/types/products";
import { useMemo } from "react";
import type { IFormSelectPlainOptions } from "@/components/forms/formSelectPlain";
import { toast } from "react-toastify";

interface Props {
  handleClose: () => void;
  categories: Category[];
}

interface IAddProductForm {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  images: string;
}

const initialValues: IAddProductForm = {
  title: "",
  price: "",
  description: "",
  categoryId: "",
  images: "",
};

const validationSchema = yup.object().shape<Shape<IAddProductForm>>({
  title: yup.string().required("Please enter title"),
  price: yup.string().required("Please enter price"),
  description: yup.string().required("Please enter description"),
  categoryId: yup.string().required("Please select category"),
  images: yup.string().required("Please enter image URL"),
});

const AddProductForm = ({ handleClose, categories }: Props) => {
  const createProductMutation = useCreateProduct();

  const _categories = useMemo<IFormSelectPlainOptions[]>(() => {
    return categories.map((category) => ({
      label: category.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: category.id as any,
    }));
  }, [categories]);

  const handleSubmit = async (values: IAddProductForm) => {
    try {
      await createProductMutation.mutateAsync({
        title: values.title,
        description: values.description,
        price: Number(values.price),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categoryId: values.categoryId as any,
        images: [values.images],
      });

      toast.success("Product added!");
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
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
        <FormSelect options={_categories} name="categoryId" label="Category" />
        <FormInput name="images" label="Image URL" />
      </DialogBody>
      <DialogFooter>
        <Button
          label="Add"
          type="submit"
          loading={createProductMutation.isPending}
          fullWidth
        />
      </DialogFooter>
    </Form>
  );
};

export default AddProductForm;
