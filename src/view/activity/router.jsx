import React from "react";
import MainLayout from "../../layout/MainLayout";

export const routerExplore = {
  path: "/explore",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};

export const routerHosting = {
  path: "/hosting",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};

export const routerJoined = {
  path: "/joined",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};

export const routerRegistered = {
  path: "/registered",
  element: React.lazy(() => import("./index")),
  layout: MainLayout,
};
