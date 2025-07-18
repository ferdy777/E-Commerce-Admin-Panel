import { type ReactNode, useEffect, useState } from "react";
import Aside from "./aside";
import Main from "./main";
import { useAuthContext } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Path } from "@/navigations/routes";

interface Props {
  children?: ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(Path.Login, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleAsideOpen = () => setIsOpen(true);
  const handleAsideClose = () => setIsOpen(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div>
      <Aside isOpen={isOpen} handleAsideClose={handleAsideClose} />
      <Main handleAsideOpen={handleAsideOpen}>{children}</Main>
    </div>
  );
};

export default ProtectedLayout;
