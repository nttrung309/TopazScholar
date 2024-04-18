import React from "react";
import MainLayout from "../../layout/MainLayout";

export const routerDetail = {
  path: "/detail",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
