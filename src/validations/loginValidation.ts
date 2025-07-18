import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: yup.string().required("Please enter password"),
});
