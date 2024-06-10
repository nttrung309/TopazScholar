import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerCreateActivityUser = {
  path: "/activity/create",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};

export const routerEditActivityUser = {
  path: "/activity/edit/:actID",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
