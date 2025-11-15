import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import DefaultLayout from "@/components/layouts/default/DefaultLayout";
import UserLayout from "@/components/layouts/user/UserLayout";
import AuthGate from "@/pages/auth/authGate.tsx";

const Buy = lazy(() => import("@/pages/buy/buy"));
const Sell = lazy(() => import("@/pages/sell/sell"));
const Home = lazy(() => import("@/pages/home/home"));
const LoginPage = lazy(() => import("@/pages/auth/login/login"));
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

          <Route path="/auth/login" element={<LoginPage />} />

          <Route
            path="/sell"
            element={
              <AuthGate>
                <UserLayout>
                  <Sell />
                </UserLayout>
              </AuthGate>
            }
          />

          <Route
            path="/messages"
            element={
              <AuthGate>
                <UserLayout>
                  <MessagesPage />
                </UserLayout>
              </AuthGate>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
