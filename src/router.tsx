import { createBrowserRouter } from 'react-router-dom';
import SignUpPage from '@/pages/sign-up-page';
import SignInPage from '@/pages/sign-in-page';
import App from './app';
import { ROUTER_PATHS } from './constants/router-paths';

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.INDEX,
    element: <App />,
    children: [
      {
        path: ROUTER_PATHS.SIGNIN,
        element: <SignInPage />,
      },
      {
        path: ROUTER_PATHS.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
