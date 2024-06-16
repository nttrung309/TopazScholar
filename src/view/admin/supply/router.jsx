import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerSupply = {
  path: "/admin/supplies",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
