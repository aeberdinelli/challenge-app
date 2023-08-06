import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { SearchPage } from '../pages/search';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/search',
    Component: SearchPage
  }
];

export const router = createBrowserRouter(routes);