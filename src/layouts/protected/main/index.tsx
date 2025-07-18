import { type ReactNode } from "react";
import Container from "@/components/common/container";
import HamburgerIcon from "@/assets/svgs/hamburger.svg?react";
import Typography from "@/components/common/typography";

interface Props {
  children?: ReactNode;
  handleAsideOpen: () => void;
}

const Main = ({ children, handleAsideOpen }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] min-h-screen overflow-x-hidden">
      <div className="hidden lg:block" />
      <div className="relative flex flex-col w-full">
        <header className="fixed top-0 bg-white left-0 lg:left-[300px] w-full lg:w-[calc(100%-300px)] h-[70px] md:h-[90px] z-10 flex items-center shadow">
          <Container>
            <div className="flex items-center gap-2">
              <button className="lg:hidden" onClick={handleAsideOpen}>
                <HamburgerIcon className="w-[20px] h-[20px]" />
              </button>
              <Typography
                variant="body-large"
                className="font-bold text-primary"
              >
                Dashboard
              </Typography>
            </div>
          </Container>
        </header>
        <main className="pt-[70px] md:pt-[100px] py-4">{children}</main>
      </div>
    </div>
  );
};

export default Main;
