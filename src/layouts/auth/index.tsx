import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../navigations/routes";
import { useAuthContext } from "../../contexts/auth-context";

interface Props {
  children?: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(Path.Products, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{!isAuthenticated && children}</>;
};

export default AuthLayout;
