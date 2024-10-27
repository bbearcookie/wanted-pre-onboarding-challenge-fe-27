import Todo from '@/components/common/todo';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
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
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full max-w-4xl p-4">
        <nav className="flex justify-between">
          <Typography variant="h1">Todo List</Typography>
          <Button onClick={handleLogout}>로그아웃</Button>
        </nav>
        <section className="mt-4 flex flex-col gap-4 rounded-md bg-gray-100 p-4">
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </section>
      </section>
    </main>
  );
};

export default TodoPage;
