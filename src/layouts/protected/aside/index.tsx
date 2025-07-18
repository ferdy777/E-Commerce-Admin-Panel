import AsideItem from "../asideItem";
import { Path } from "../../../navigations/routes";
import TimelineIcon from "@/assets/svgs/timeline.svg?react";
import TimesIcon from "@/assets/svgs/times.svg?react";
import ChartBarIcon from "@/assets/svgs/chart-bar.svg?react";
import LogoutIcon from "@/assets/svgs/logout.svg?react";
import Typography from "../../../components/common/typography";
import cs from "classnames";
import { useAuthContext } from "../../../contexts/auth-context";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  handleAsideClose: () => void;
}

const Aside = ({ isOpen, handleAsideClose }: Props) => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    handleAsideClose();
    toast.success("Logout successful");
  };

  return (
    <>
      <div
        onClick={handleAsideClose}
        className={cs(
          "lg:hidden fixed top-0 z-20 w-full h-full bg-primary/30 transition-opacity duration-200",
          {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
      />
      <aside
        className={cs(
          "fixed top-0 lg:left-0 w-[300px] h-full duration-200 z-20 px-4 transform transition-transform shadow-lg bg-gray-50 lg:bg-white",
          {
            "translate-x-0": isOpen,
            "-translate-x-full lg:translate-x-0": !isOpen,
          }
        )}
      >
        <div className="md:h-[90px] mb-8 w-full flex flex-row pt-2 justify-between lg:justify-center gap-2 lg:text-text-grey items-center">
          <div className="flex flex-col lg:items-center">
            <TimelineIcon className="w-[25px] h-[25px] text-primary" />
            <Typography
              variant="body-large"
              className="text-primary font-semibold"
            >
              Admin Panel
            </Typography>
          </div>
          <button onClick={handleAsideClose} className="lg:hidden">
            <TimesIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="space-y-4">
          <AsideItem
            href={Path.Products}
            icon={<ChartBarIcon className="w-[20px] h-[20px] text-primary" />}
            label="Dashboard"
          />
          <AsideItem
            icon={<LogoutIcon className="w-[20px] h-[20px] text-primary" />}
            label="Logout"
            onClick={handleLogout}
            btn
            href=""
          />
        </div>
      </aside>
    </>
  );
};

export default Aside;
