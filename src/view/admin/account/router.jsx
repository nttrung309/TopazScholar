import React from "react";
import AdminLayout from "../../../layout/AdminLayout";

export const routerAccount = {
  path: "/admin/account",
  element: React.lazy(() => import("./index")),
  layout: AdminLayout,
};
