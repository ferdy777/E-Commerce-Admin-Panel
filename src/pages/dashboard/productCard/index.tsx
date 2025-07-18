import Typography from "@/components/common/typography";
import { trimToLength } from "@/utils/trimToLength";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Product } from "@/types/products";
import { Link } from "react-router-dom";
import { Path } from "@/navigations/routes";

interface Props {
  product: Product;
}

const FALLBACK_IMAGE = "/placeholder-image.jpg";

const ProductCard = ({ product }: Props) => {
  const { title, description, price, images, image, category, id } = product;

  const displayImage = images?.[0] || image || FALLBACK_IMAGE;
  const categoryName = category?.name || "Unknown";
  const productUrl = `${Path.Products}/${id}`;

  return (
    <Link
      to={productUrl}
      className="px-5 flex flex-col hover:bg-primary/5 duration-200 py-5 rounded-xl shadow border border-primary/10"
    >
      <div className="h-[250px] overflow-hidden rounded-2xl mb-4">
        <img
          alt={`image of ${title}`}
          src={displayImage}
          className="w-full h-full object-cover bg-primary/10"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
      </div>

      <Typography
        variant="body-x-small"
        className="bg-primary/10 text-primary w-max px-2 py-1 mb-1 rounded-lg"
      >
        {categoryName}
      </Typography>
      <div className="flex flex-col flex-1">
        <Typography variant="body-large" className="font-semibold text-primary">
          {trimToLength(title, 25)}
        </Typography>

        <Typography className="mt-3 mb-6 flex-1">
          {trimToLength(description)}
        </Typography>

        <div className="flex items-center justify-between gap-3">
          <Typography variant="body-large" className="font-bold">
            {formatCurrency(price)}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
