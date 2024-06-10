import React from "react";
import MainLayout from "../../layout/MainLayout";

export const routerDetail = {
  path: "/activity/:actID",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
