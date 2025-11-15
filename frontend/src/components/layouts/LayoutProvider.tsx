import { Outlet } from "react-router-dom";
import { isAuthenticated } from "@/mocks/mockAuth";
import DefaultLayout from "./default/DefaultLayout";
import UserLayout from "./user/UserLayout";

const LayoutProvider = () => {
  const loggedIn = isAuthenticated();

  if (loggedIn) {
    return (
      <UserLayout>
        <Outlet />
      </UserLayout>
    );
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default LayoutProvider;
