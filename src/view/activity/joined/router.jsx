import React from "react";
import MainLayout from "../../../layout/MainLayout";

export const routerJoined = {
  path: "/joined",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
