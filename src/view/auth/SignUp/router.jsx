import React from 'react';

export const routerSignUp = {
  path: '/auth/sign-up',
  element: React.lazy(() => import('./index')),
  layout: null
};