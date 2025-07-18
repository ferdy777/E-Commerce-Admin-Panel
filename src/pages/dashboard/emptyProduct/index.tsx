import Typography from "@/components/common/typography";

const EmptyProduct = () => {
  return (
    <div className="flex flex-col my-20 items-center w-full max-w-[500px] shadow-lg mx-auto py-8 border border-primary/10 px-4 rounded-xl">
      <Typography variant="heading-4" className="font-medium mb-2">
        No data
      </Typography>
      <Typography className="mb-8">
        No product found for the selected filters.
      </Typography>
    </div>
  );
};

export default EmptyProduct;
