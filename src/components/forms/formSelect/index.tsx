import { ErrorMessage, useField } from "formik";
import type { ReactNode } from "react";
import cs from "classnames";
import Typography from "../../common/typography";

export interface IFormSelectOptions {
  label: string;
  value: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  extraDetails?: ReactNode;
  options: IFormSelectOptions[];
}

const FormSelect = ({
  label,
  name,
  id,
  extraDetails,
  disabled,
  options,
  ...otherProps
}: Props) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name);

  const isInvalid = !!touched && !!error;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-5">
      <div className="relative w-full">
        {label && (
          <label
            className={cs("text-text-light font-medium block text-[14px]", {
              "opacity-60 cursor-not-allowed": disabled,
            })}
            htmlFor={id || name}
          >
            {label}
          </label>
        )}
        <select
          name={name}
          onChange={handleChange}
          value={value}
          className={cs(
            "w-full mt-1 outline-offset-0 text-text-light text-[14px] text-grey-text font-raleway placeholder:font-raleway duration-100 focus:outline px-4 py-3 border border-primary/30 rounded-lg",
            {
              "focus:!outline-error/10 focus:!bg-error/5 !border-error/60":
                isInvalid,
              "focus:!outline-primary/10 focus:!bg-primary/5 focus:!border-primary/60":
                !isInvalid,
              "opacity-70 cursor-not-allowed": disabled,
            }
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
      <ErrorMessage
        name={name}
        render={(errorMessage) => (
          <Typography variant="body-x-small" className="text-error">
            {errorMessage}
          </Typography>
        )}
      />
      {extraDetails && (
        <Typography variant="body-x-small" className="text-grey-text">
          {extraDetails}
        </Typography>
      )}
    </div>
  );
};

export default FormSelect;
