import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/404";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/users";
import Loader from "../components/modules/Loader";

function Router() {
  const { data, isLoading, error } = useQuery(["Profile"], getProfile);
  console.log({ data, isLoading, error });

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={data ? <Navigate to="/dashboard" /> : <AuthPage /> } />
      <Route path="dashboard" element={data ? <Dashboard /> : <Navigate to="/auth" /> } />
      <Route path="/admin" element={data && data.data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
