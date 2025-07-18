const ProductImage = ({ image, title }: { image?: string; title: string }) => {
  return (
    <img
      src={image}
      alt={title}
      className="w-full shadow-2xl md:w-1/2 rounded-lg object-cover"
    />
  );
};

export default ProductImage;
