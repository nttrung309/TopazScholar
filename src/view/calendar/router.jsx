import React from 'react';
import MainLayout from '../../layout/MainLayout';

export const routerCalendar = {
  path: '/calendar',
  element: React.lazy(() => import('./index')),
  layout: MainLayout
};