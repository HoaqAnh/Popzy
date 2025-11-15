import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/mocks/mockAuth";

const AuthGate = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGate;
