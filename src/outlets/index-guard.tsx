import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import { Navigate } from 'react-router-dom';

const IndexGuard = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={ROUTER_PATHS.TODO} />;
  } else {
    return <Navigate to={ROUTER_PATHS.SIGNIN} />;
  }
};

export default IndexGuard;
