import Button from "@/components/common/button";
import Typography from "@/components/common/typography";

interface Props {
  handleFetchProducts: () => void;
}

const ErrorUI = ({ handleFetchProducts }: Props) => {
  return (
    <div className="flex flex-col my-20 items-center w-full max-w-[500px] shadow-lg mx-auto py-8 border border-primary/10 px-4 rounded-xl">
      <Typography variant="heading-4" className="font-medium mb-2">
        Error
      </Typography>
      <Typography className="mb-8">Error fetching products</Typography>
      <div className="w-full max-w-[200px]">
        <Button label="Retry" fullWidth onClick={handleFetchProducts} />
      </div>
    </div>
  );
};

export default ErrorUI;
