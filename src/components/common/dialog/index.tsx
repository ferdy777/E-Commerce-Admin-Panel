import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
} from "@headlessui/react";
import { type ReactNode } from "react";
import TimesIcon from "@/assets/svgs/times.svg?react";
import cs from "classnames";
import Typography from "../typography";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  disableOverlayClick?: boolean;
  disableCloseBtnClick?: boolean;
  children?: ReactNode;
  size?: "normal" | "large" | "content" | "small";
  showCloseButton?: boolean;
  header?: string;
}

interface DialogGeneralProps {
  children?: ReactNode;
  className?: string;
}

type DialogHeaderProps = DialogGeneralProps;
type DialogTitleProps = DialogGeneralProps;
type DialogFooterProps = DialogGeneralProps;
type DialogBodyProps = DialogGeneralProps;
type CloseButtonProps = Pick<Props, "handleClose" | "disableCloseBtnClick">;

export const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return (
    <header
      className={cs(
        "px-4 md:px-8 z-[11] bg-white sticky top-0 pb-3 pt-6",
        className
      )}
    >
      {children}
    </header>
  );
};

export const DialogHeaderWithText = ({
  children,
  className,
}: DialogHeaderProps) => {
  return (
    <header
      className={cs(
        "px-4 md:px-8 z-[11] bg-white sticky top-0 pb-3 pt-3",
        className
      )}
    >
      <Typography
        className="font-semibold text-center text-primary"
        variant="heading-5"
        tabletVariant="heading-4"
      >
        {children}
      </Typography>
    </header>
  );
};

export const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <footer
      className={cs(
        "px-4 md:px-8 z-10 sticky bg-white bottom-0 pt-3 pb-6",
        className
      )}
    >
      {children}
    </footer>
  );
};

export const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <HeadlessDialogTitle
      as="h3"
      className={cs("text-text-medium font-medium text-purple-main", className)}
    >
      {children}
    </HeadlessDialogTitle>
  );
};

export const DialogBody = ({ children, className }: DialogBodyProps) => {
  return <div className={cs("px-4 md:px-8 py-2", className)}>{children}</div>;
};

const CloseButton = ({
  handleClose,
  disableCloseBtnClick,
}: CloseButtonProps) => (
  <div className="px-4 md:px-8 pt-4 pb-2">
    <button
      onClick={handleClose}
      disabled={disableCloseBtnClick}
      className={cs(
        "rounded w-[40px] h-[40px] cursor-pointer shadow flex items-center justify-center",
        {
          "cursor-not-allowed bg-primary/5 opacity-70": disableCloseBtnClick,
        }
      )}
    >
      <TimesIcon className="text-primary w-[30px] h-[30px]" />
    </button>
  </div>
);

const Dialog = ({
  isOpen,
  handleClose,
  disableOverlayClick,
  children,
  size = "normal",
  showCloseButton = true,
  header,
  disableCloseBtnClick,
}: Props) => {
  return (
    <HeadlessDialog
      as="div"
      open={isOpen}
      className="fixed z-40 inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      transition
      onClose={disableOverlayClick ? () => undefined : handleClose}
    >
      <DialogPanel
        className={cs(
          "max-h-[90vh] relative transform overflow-y-auto rounded-2xl bg-white text-left align-middle shadow-xl transition-all",
          {
            "w-full md:w-[600px] lg:w-[400px] max-w-[800px]": size === "small",
            "w-full md:w-[600px] lg:w-[600px] max-w-[800px]": size === "normal",
            "w-full md:w-[600px] lg:w-[800px] max-w-[800px]": size === "large",
            "w-max max-w-full": size === "content",
          }
        )}
      >
        {showCloseButton && (
          <CloseButton
            handleClose={handleClose}
            disableCloseBtnClick={disableCloseBtnClick}
          />
        )}
        {header && <DialogHeaderWithText>{header}</DialogHeaderWithText>}
        {children}
      </DialogPanel>
    </HeadlessDialog>
  );
};

export default Dialog;
