import React from "react";
import { Outlet } from "react-router";

const BrouteView = () => {
  return (
    <div>
      <p>BrouteView</p>
      {/* nested route for comments */}
      <Outlet />
    </div>
  );
};

export default BrouteView;
