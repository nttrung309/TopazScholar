import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerStatistics = {
  path: "/admin/statistics",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
