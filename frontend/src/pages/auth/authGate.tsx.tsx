import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/mocks/mockAuth";

type AuthGateProps = {
  children: React.ReactNode;
};

const AuthGate = ({ children }: AuthGateProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGate;
