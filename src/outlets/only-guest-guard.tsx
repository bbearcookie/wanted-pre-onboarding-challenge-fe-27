import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';

const OnlyGuestGuard = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTER_PATHS.TODO} />;
  }
};

export default OnlyGuestGuard;
