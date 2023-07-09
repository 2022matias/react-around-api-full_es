import React from "react";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, ...props }) {
  if (props.isLoggedIn) {
    return children;
  }
  return <Navigate to="/signin" />;
}