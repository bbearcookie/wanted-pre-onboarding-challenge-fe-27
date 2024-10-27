import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTER_PATHS.SIGNIN} />;
  }
};

export default AuthGuard;
