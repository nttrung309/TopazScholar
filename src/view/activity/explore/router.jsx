import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerExplore = {
  path: "/explore",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
