import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import DefaultLayout from "@/components/layouts/default/DefaultLayout";
import UserLayout from "@/components/layouts/user/UserLayout";

const Buy = lazy(() => import("@/pages/buy/buy"));
const Sell = lazy(() => import("@/pages/sell/sell"));
const Home = lazy(() => import("@/pages/home/home"));
const AuthPage = lazy(() => import("@/pages/auth/auth"));
const MessagesPage = lazy(() => import("@/pages/messages/messages"));

const PageLoader = () => (
  <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
    Đang tải trang...
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          /> */}
          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />
          <Route
            path="/buy"
            element={
              <UserLayout>
                <Buy />
              </UserLayout>
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
          <Route
            path="/messages"
            element={
              <UserLayout>
                <MessagesPage />
              </UserLayout>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
