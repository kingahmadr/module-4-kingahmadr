import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDataContext } from "../context/UseDataContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useDataContext();

  if (isAuthenticated) {
    // Allow access to the protected route
    return <Outlet />;
  } else {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
