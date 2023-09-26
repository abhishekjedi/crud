import React from "react";
import MainNavigation from "../Components/MainNavigation";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <header>
        <MainNavigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
