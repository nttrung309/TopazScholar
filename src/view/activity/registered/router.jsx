import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerRegistered = {
  path: "/registered",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
