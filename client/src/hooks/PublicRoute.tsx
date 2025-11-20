import { Navigate } from "react-router-dom";
import { useAppSelector } from ".";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log(isAuthenticated ? "nv" : "login");
  return isAuthenticated ? <Navigate to="/" /> : children;
};
