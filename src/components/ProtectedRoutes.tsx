import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
