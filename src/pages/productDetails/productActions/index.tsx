import Button from "@/components/common/button";

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
}

const ProductActions = ({ onUpdate, onDelete }: Props) => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <Button label="Update Product" onClick={onUpdate} />
      <Button label="Delete Product" onClick={onDelete} variant="danger" />
    </div>
  );
};

export default ProductActions;
