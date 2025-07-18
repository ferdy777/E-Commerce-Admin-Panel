/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductImage from "../productImage";
import ProductInfo from "../productInfo";
import ProductActions from "../productActions";

interface Props {
  product: any;
  onUpdate: () => void;
  onDelete: () => void;
}

const ProductContent = ({ product, onUpdate, onDelete }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <ProductImage image={product.images?.[0]} title={product.title} />
      <div className="flex-1">
        <ProductInfo
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category?.name}
        />
        <ProductActions onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default ProductContent;
