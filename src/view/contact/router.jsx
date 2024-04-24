import React from 'react';
import MainLayout from '../../layout/MainLayout';

export const routerContact = {
  path: '/contact',
  element: React.lazy(() => import('./index')),
  layout: MainLayout
};