import Typography from "@/components/common/typography";

interface Props {
  title: string;
  description: string;
  price: number;
  category?: string;
}

const ProductInfo = ({ title, description, price, category }: Props) => {
  return (
    <>
      <Typography variant="heading-4">{title}</Typography>
      <Typography className="mt-2">{description}</Typography>
      <Typography className="mt-4 font-bold text-xl">${price}</Typography>
      <Typography className="mt-2 text-primary">
        Category: {category}
      </Typography>
    </>
  );
};

export default ProductInfo;
