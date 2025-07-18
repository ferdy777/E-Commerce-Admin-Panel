import Typography from "@/components/common/typography";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";

interface Props {
  href: string;
  label: string;
  icon: ReactNode;
  btn?: boolean;
  onClick?: () => void;
}

const AsideItem = ({ href, icon, label, btn, onClick }: Props) => {
  return (
    <>
      {btn ? (
        <button
          onClick={onClick}
          className="flex items-center w-full gap-3 border bg-primary/5 hover:bg-primary/20 duration-150 rounded-lg shadow-lg text-primary cursor-pointer py-3 px-4 border-primary"
        >
          <div>{icon}</div>
          <Typography className="font-semibold">{label}</Typography>
        </button>
      ) : (
        <Link
          to={href}
          className="flex items-center gap-3 border bg-primary/5 hover:bg-primary/20 duration-150 rounded-lg shadow-lg text-primary py-3 px-4 border-primary"
        >
          <div>{icon}</div>
          <Typography className="font-semibold">{label}</Typography>
        </Link>
      )}
    </>
  );
};

export default AsideItem;
