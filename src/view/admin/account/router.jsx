import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerAccount = {
  path: "/admin/account",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
