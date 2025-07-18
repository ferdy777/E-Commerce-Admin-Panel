import ArrowClockwiseIcon from "@/assets/svgs/arrow-clockwise.svg?react";
import Typography from "@/components/common/typography";

const Loader = () => {
  return (
    <div className="flex flex-col items-center py-20">
      <ArrowClockwiseIcon className="w-[35px] h-[35px] text-primary/30 animate-spin" />
      <Typography className="font-medium">Loading Products...</Typography>
    </div>
  );
};

export default Loader;
