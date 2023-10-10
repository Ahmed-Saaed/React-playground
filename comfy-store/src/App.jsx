import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import {ErrorElement} from './components';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {store} from './store.js';
// loaders

import {loader as landingLoader} from './pages/Landing';
import {loader as productLoader} from './pages/SingleProduct';
import {loader as productsLoader} from './pages/Products';
import {loader as checkoutLoader} from './pages/Checkout';
import {loader as orderLoader} from './pages/Orders';
//actions
import {action as regitserAction} from './pages/Register';
import {action as loginAction} from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader,
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: productLoader,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {path: 'about', element: <About />},
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: orderLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: regitserAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
