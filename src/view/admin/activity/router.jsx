import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerActivityAdmin = {
  path: "/admin/activity",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
