import { createBrowserRouter } from 'react-router-dom';
import SignUpPage from '@/pages/SignUpPage';
import SignInPage from '@/pages/SignInPage';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/auth',
        element: <SignInPage />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
