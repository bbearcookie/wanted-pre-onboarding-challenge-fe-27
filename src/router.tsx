import { createBrowserRouter } from 'react-router-dom';
import SignUpPage from '@/pages/sign-up-page';
import SignInPage from '@/pages/sign-in-page';
import { ROUTER_PATHS } from './constants/router-paths';
import OnlyGuestGuard from './outlets/only-guest-guard';
import AuthGuard from './outlets/auth-guard';
import TodoPage from './pages/todo-page';
import IndexGuard from './outlets/index-guard';
import TodoDetailPage from './pages/todo-detail-page';
import queryClient from './lib/query-client';
import { loader as todoLoader } from './pages/todo-page';
import { loader as todoDetailLoader } from './pages/todo-detail-page';

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.INDEX,
    element: <IndexGuard />,
  },

  {
    path: ROUTER_PATHS.INDEX,
    element: <OnlyGuestGuard />,
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
  {
    path: ROUTER_PATHS.INDEX,
    element: <AuthGuard />,
    children: [
      {
        path: ROUTER_PATHS.TODO,
        element: <TodoPage />,
        loader: todoLoader(queryClient),
      },
      {
        path: ROUTER_PATHS.TODO_DETAIL(':todoId'),
        element: <TodoDetailPage />,
        loader: todoDetailLoader(queryClient),
      },
    ],
  },
]);

export default router;
