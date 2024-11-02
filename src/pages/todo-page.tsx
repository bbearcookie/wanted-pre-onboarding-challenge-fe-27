import { useCreateTodoMutation } from '@/api/mutations/useCreateTodoMutation';
import { todosOptions } from '@/api/query-options/todos';
import TodoForm from '@/components/domain/todo/todo-form';
import { Button } from '@/components/ui/button';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { useToast } from '@/hooks/use-toast';
import TodoPageLayout from '@/layouts/todo-page-layout';
import { todoSchema } from '@/schemas/todo-schema';
import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { LoaderFunctionArgs, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const TodoPage = () => {
  const todoForm = useForm<z.infer<typeof todoSchema>>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createMutation = useCreateTodoMutation();

  const { data: todos } = useSuspenseQuery(todosOptions.list());

  const handleCreate = (data: z.infer<typeof todoSchema>) => {
    createMutation.mutate(
      {
        data,
      },
      {
        onSuccess: (res) => {
          toast({
            title: '할 일 추가',
            description: '할 일을 추가했습니다.',
          });
          navigate(ROUTER_PATHS.TODO_DETAIL(res.data.id));
        },
      },
    );
  };

  return (
    <TodoPageLayout todos={todos.data}>
      <TodoForm
        className="flex grow flex-col gap-4 p-4"
        form={todoForm}
        onSubmit={handleCreate}
        onError={(error) => console.log(error)}
      >
        <section className="flex justify-end">
          <Button>추가</Button>
        </section>
      </TodoForm>
    </TodoPageLayout>
  );
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    await queryClient.ensureQueryData(todosOptions.list());
    return null;
  };

export default TodoPage;
