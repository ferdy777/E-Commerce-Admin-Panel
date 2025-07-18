import { Routes, Route, Navigate } from "react-router-dom";
import { Path } from "@/navigations/routes";
import AuthLayout from "./layouts/auth";
import ProtectedLayout from "./layouts/protected";
import LoginScreen from "./pages/auth/login";
import DashboardScreen from "./pages/dashboard";
import { useAuthContext } from "./contexts/auth-context";
import ProductDetails from "./pages/productDetails";

export default function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route
        path={Path.Login}
        element={
          <AuthLayout>
            <LoginScreen />
          </AuthLayout>
        }
      />
      <Route
        path={Path.Products}
        element={
          <ProtectedLayout>
            <DashboardScreen />
          </ProtectedLayout>
        }
      />
      <Route
        path={`${Path.Products}/:id`}
        element={
          <ProtectedLayout>
            <ProductDetails />
          </ProtectedLayout>
        }
      />
      <Route
        path={Path.Home}
        element={
          isAuthenticated ? (
            <Navigate to={Path.Products} replace />
          ) : (
            <Navigate to={Path.Login} replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={Path.Home} replace />} />
    </Routes>
  );
}
