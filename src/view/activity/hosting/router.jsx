import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerHosting = {
  path: "/hosting",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
