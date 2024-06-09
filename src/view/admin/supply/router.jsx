import React from "react";
import AdminLayout from "../../../layout/AdminLayout";

export const routerSupply = {
  path: "/admin/supplies",
  element: React.lazy(() => import("./index")),
  layout: AdminLayout,
};
