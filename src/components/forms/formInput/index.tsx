import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";
import type { ReactNode } from "react";
import cs from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  extraDetails?: ReactNode;
}

const FormInput = ({
  label,
  name,
  id,
  type = "text",
  extraDetails,
  disabled,
  ...otherProps
}: Props) => {
  const [inputType, setInputType] = useState(type);
  const [, { touched, error }] = useField(name);
  const isInvalid = !!touched && !!error;

  const handlePasswordShow = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="mb-6 w-full max-w-full">
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={id || name}
            className={cs(
              "absolute text-xs px-2 rounded left-3 -top-2 z-10 bg-white border border-neutral-black/40 text-neutral-black",
              { "opacity-60": disabled }
            )}
          >
            {label}
          </label>
        )}

        <Field
          {...otherProps}
          name={name}
          id={id || name}
          type={inputType}
          disabled={disabled}
          className={cs(
            "w-full text-sm px-4 pt-5 pb-2 rounded border focus:outline-none duration-150 placeholder-transparent",
            {
              "border-red-500 focus:bg-red-500/5 focus:ring-4 focus:ring-red-500/20":
                isInvalid,
              "border-gray-300 focus:bg-primary/5 focus:ring-4 focus:ring-primary/20":
                !isInvalid,
              "opacity-60 cursor-not-allowed": disabled,
              "!pr-12": type === "password",
            }
          )}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={handlePasswordShow}
            disabled={disabled}
            className={cs("absolute right-3 bottom-2 py-1 text-xs", {
              "opacity-60 cursor-not-allowed": disabled,
            })}
          >
            {inputType === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>

      <ErrorMessage
        name={name}
        render={(msg) => <p className="mt-1 text-xs text-red-600">{msg}</p>}
      />

      {extraDetails && (
        <p className="mt-1 text-xs text-gray-500 bg-blue-50 px-2 py-2 rounded">
          {extraDetails}
        </p>
      )}
    </div>
  );
};

export default FormInput;
