import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/404";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/users";

function Router() {

  const {data, isLoading, error} = useQuery(["Profile"], getProfile)
  console.log({data, isLoading, error })

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
