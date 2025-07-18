import type { ReactNode } from "react";
import cs from "classnames";
import Typography from "../../common/typography";

export interface IFormSelectPlainOptions {
  label: string;
  value: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  extraDetails?: ReactNode;
  options: IFormSelectPlainOptions[];
  addMargin?: boolean;
}

const FormSelectPlain = ({
  label,
  name,
  id,
  extraDetails,
  disabled,
  options,
  addMargin = true,
  ...otherProps
}: Props) => {
  return (
    <div
      className={cs("w-full", {
        "mb-5": addMargin,
      })}
    >
      <div className="relative w-full">
        {label && (
          <label
            className={cs(
              "text-text-light font-medium block text-[14px] mb-1",
              {
                "opacity-60 cursor-not-allowed": disabled,
              }
            )}
            htmlFor={id || name}
          >
            {label}
          </label>
        )}
        <select
          name={name}
          className={cs(
            "w-full outline-offset-0 text-text-light text-[14px] text-grey-text font-raleway placeholder:font-raleway duration-100 focus:outline px-4 py-3 border border-primary/30 rounded-lg"
          )}
          {...otherProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {extraDetails && (
        <Typography variant="body-x-small" className="text-grey-text">
          {extraDetails}
        </Typography>
      )}
    </div>
  );
};

export default FormSelectPlain;
