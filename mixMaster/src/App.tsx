import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import React from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {About, Error, Newletter, Landing, Cocktails, HomeLayout} from './pages';
import {loader as landingLoader} from './pages/landing';
import {loader as singleCocktailLoader} from './pages/cocktails';
import {action as newsletterAction} from './pages/newLettter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'cocktail/:id',
        errorElement: <Error />,
        element: <Cocktails />,
        loader: singleCocktailLoader,
      },
      {
        index: true,
        element: <Newletter />,
        action: newsletterAction,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
