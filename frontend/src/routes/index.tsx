import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import DefaultLayout from "@/components/layouts/default/DefaultLayout";
import UserLayout from "@/components/layouts/user/UserLayout";
const Buy = lazy(() => import("@/pages/buy/buy"));
const Sell = lazy(() => import("@/pages/sell/sell"));
const Home = lazy(() => import("@/pages/home/home"));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/buy"
          element={
            <DefaultLayout>
              <Buy />
            </DefaultLayout>
          }
        />
        <Route
          path="/sell"
          element={
            <UserLayout>
              <Sell />
            </UserLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
