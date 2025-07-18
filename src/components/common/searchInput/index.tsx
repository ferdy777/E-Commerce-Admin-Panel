import React from "react";
import SearchIcon from "@/assets/svgs/search.svg?react";
import cs from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconPosition?: "left" | "right" | "none";
}

const SearchInput = ({
  className,
  type = "search",
  iconPosition = "left",
  placeholder = "Search...",
  ...props
}: Props) => {
  return (
    <div
      className={cs("relative", {
        [`${className}`]: className,
      })}
    >
      <input
        type={type}
        className={cs(
          "w-full bg-white shadow py-3 text-[14px] border border-primary/20 rounded-xl duration-300 transition-colors focus:bg-grey-base/60 focus:outline-[4px] focus:outline-offset-[1px] outline-primary/20",
          {
            "pl-12 pr-5": iconPosition === "left",
            "pr-12 pl-5": iconPosition === "right",
          }
        )}
        {...props}
        placeholder={placeholder}
      />
      <SearchIcon
        className={cs(
          "absolute w-[16px] h-[16px] top-[50%] translate-y-[-50%]",
          {
            "left-5": iconPosition === "left",
            "right-5": iconPosition === "right",
          }
        )}
      />
    </div>
  );
};

export default SearchInput;
