import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerActivytyAdmin = {
  path: "/admin/activity",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
