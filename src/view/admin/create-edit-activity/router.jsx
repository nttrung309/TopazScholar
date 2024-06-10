import React from "react";
import AdminLayout from "../../../layout/AdminLayout";

export const routerCreateActivity = {
  path: "/admin/activity/create",
  element: React.lazy(() => import("./index")),
  layout: AdminLayout,
};

export const routerEditActivity = {
  path: "/admin/activity/:actID",
  element: React.lazy(() => import("./index")),
  layout: AdminLayout,
};
