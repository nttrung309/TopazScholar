import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerCreateActivity = {
  path: "/admin/activity/create",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};

export const routerEditActivity = {
  path: "/admin/activity/edit",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
