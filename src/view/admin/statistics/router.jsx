import React from "react";
import AdminLayout from "../../../layout/AdminLayout";

export const routerStatistics = {
  path: "/admin/statistics",
  element: React.lazy(() => import("./index")),
  layout: AdminLayout,
};
