import { todosOptions } from '@/api/query-options/todos';
import { TodosService } from '@/api/services/todos';
import Todo from '@/components/domain/todo/todo';
import TodoForm from '@/components/domain/todo/todo-form';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import { todoSchema } from '@/schemas/todo-schema';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const TodoPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const todoForm = useForm<z.infer<typeof todoSchema>>();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: TodosService.createTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: todosOptions.all,
      }),
  });

  const { data: todos } = useSuspenseQuery(todosOptions.list());

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
            {todos.data.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </aside>
          <TodoForm
            className="flex grow flex-col gap-4 p-4"
            form={todoForm}
            onSubmit={(data) => {
              createMutation.mutate({
                data,
              });
            }}
            onError={(error) => console.log(error)}
          />
        </div>
      </section>
    </main>
  );
};

export default TodoPage;
