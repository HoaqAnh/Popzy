import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Buy } from "@/pages/buy";
import { Home } from "@/pages/home";

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
      </Routes>
    </BrowserRouter>
  );
};
