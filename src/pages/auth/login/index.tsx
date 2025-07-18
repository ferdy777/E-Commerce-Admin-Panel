/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button";
import Container from "@/components/common/container";
import Form from "../../../components/forms/form";
import FormInput from "../../../components/forms/formInput";
import Typography from "@/components/common/typography";
import { Path } from "@/navigations/routes";
import { loginService } from "../../../services/auth-service";
import { useAuthContext } from "@/contexts/auth-context";
import { toast } from "react-toastify";
import { loginValidationSchema } from "@/validations/loginValidation";

interface ILoginForm {
  email: string;
  password: string;
}

const initialValues: ILoginForm = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ILoginForm) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await loginService(values);

      if (res && res.access_token) {
        login(res.access_token, values.email, res.refresh_token ?? null);
        toast.success("Login successful! Welcome back.");
        navigate(Path.Products, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container className="flex items-center min-h-screen">
        <div className="w-full max-w-[450px] mx-auto border border-gray-300/50 shadow-lg rounded-xl px-5 py-5">
          <Typography
            variant="heading-4"
            className="text-center font-medium mb-6"
          >
            Log in
          </Typography>

          {error && (
            <div className="px-3 py-2 rounded-lg bg-red-100 text-red-700 mb-4">
              {error}
            </div>
          )}

          <Form
            className="max-w-[500px] mx-auto"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
          >
            <FormInput name="email" label="Email" type="email" />
            <FormInput name="password" label="Password" type="password" />
            <div className="mt-4">
              <Button
                label={isLoading ? "Logging in..." : "Login"}
                type="submit"
                fullWidth
                disabled={isLoading}
              />
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginScreen;
