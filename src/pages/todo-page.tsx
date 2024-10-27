import { Button } from '@/components/ui/button';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate(ROUTER_PATHS.SIGNIN);
  };

  return (
    <>
      <Button onClick={handleLogout}>로그아웃</Button>
    </>
  );
};

export default TodoPage;
