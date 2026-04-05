// src/routes/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentToken, useAppSelector } from "../redux/hooks/redux-hook";
import type { ReactNode } from "react";


const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
