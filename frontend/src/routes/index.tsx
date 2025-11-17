import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LayoutProvider from "@/components/layouts/LayoutProvider";
import AuthGate from "@/pages/auth/authGate.tsx";

const Buy = lazy(() => import("@/pages/buy/buy"));
const Sell = lazy(() => import("@/pages/sell/sell"));
const Home = lazy(() => import("@/pages/home/home"));
const LoginPage = lazy(() => import("@/pages/auth/login/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register/register"));
const MessagesPage = lazy(() => import("@/pages/messages/messages"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/forgot-password/ForgotPassword")
);

const PageLoader = () => (
  <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
    Đang tải trang...
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route element={<LayoutProvider />}>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />

            <Route element={<AuthGate />}>
              <Route path="/sell" element={<Sell />} />
              <Route path="/messages" element={<MessagesPage />} />
            </Route>
          </Route>

          {/* 404 */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
