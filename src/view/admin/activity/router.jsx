import React from "react";
import AdminLayout from "../../../layout/AdminLayout";

export const routerActivityAdmin = {
  path: "/admin/activity",
  element: React.lazy(() => import("./index")),
  layout: AdminLayout,
};
