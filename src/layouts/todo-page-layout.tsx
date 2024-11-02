import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Todo as TodoModel } from '@/api/dtos/todos';
import Todo from '@/components/domain/todo/todo';
import { PlusIcon } from '@radix-ui/react-icons';
import { IconButton } from '@/components/ui/icon-button';

interface TodoPageLayoutProps {
  todos: TodoModel[];
  children: React.ReactNode;
}

const TodoPageLayout = ({ todos, children }: TodoPageLayoutProps) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTER_PATHS.SIGNIN);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="w-full max-w-screen-xl p-4">
        <nav className="flex justify-between">
          <Typography variant="h1">Todo List</Typography>
          <Button onClick={handleLogout}>로그아웃</Button>
        </nav>

        <div className="mt-8 flex">
          <aside className="flex h-[80svh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-md bg-gray-100 p-4">
            <IconButton className="w-fit self-end border-2 border-gray-300 bg-white">
              <Link to={ROUTER_PATHS.TODO}>
                <PlusIcon className="h-6 w-6" />
              </Link>
            </IconButton>
            {todos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </aside>
          {children}
        </div>
      </section>
    </main>
  );
};

export default TodoPageLayout;
