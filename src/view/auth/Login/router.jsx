import React from 'react';

export const routerLogin = {
  path: '/auth/login',
  element: React.lazy(() => import('./index')),
  layout: null
};