import React from 'react';
import MainLayout from '../../layout/MainLayout';

export const routerHome = {
  path: '/',
  element: React.lazy(() => import('./index')),
  layout: MainLayout
};