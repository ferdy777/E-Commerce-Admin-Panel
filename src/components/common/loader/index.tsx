import ArrowClockwiseIcon from "@/assets/svgs/arrow-clockwise.svg?react";
import Typography from "../typography";

interface Props {
  message?: string;
}

const Loader = ({ message = "Loading..." }: Props) => {
  return (
    <div className="flex flex-col items-center py-20">
      <ArrowClockwiseIcon className="w-[50px] h-[50px] text-primary/70 animate-spin" />
      <Typography className="font-medium text-primary/80">{message}</Typography>
    </div>
  );
};

export default Loader;
