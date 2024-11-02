import { useDeleteTodoMutation } from '@/api/mutations/useDeleteTodoMutation';
import { useUpdateTodoMutation } from '@/api/mutations/useUpdateTodoMutation';
import { todosOptions } from '@/api/query-options/todos';
import TodoForm from '@/components/domain/todo/todo-form';
import { Button } from '@/components/ui/button';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { useToast } from '@/hooks/use-toast';
import TodoPageLayout from '@/layouts/todo-page-layout';
import { todoSchema } from '@/schemas/todo-schema';
import invariant from '@/utils/invariant';
import { QueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoaderFunctionArgs, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const TodoDetailPage = () => {
  const { todoId } = useParams() as { todoId: string };
  const { toast } = useToast();
  const navigate = useNavigate();
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const [{ data: todos }, { data: todoDetail }] = useSuspenseQueries({
    queries: [todosOptions.list(), todosOptions.detail(todoId)],
  });

  const todoForm = useForm<z.infer<typeof todoSchema>>({
    defaultValues: todoDetail.data,
  });

  const handleDelete = () =>
    deleteMutation.mutate(
      {
        id: todoId,
      },
      {
        onSuccess: () => {
          toast({
            title: '할 일 삭제',
            description: '할 일을 삭제했습니다.',
          });
          navigate(ROUTER_PATHS.TODO);
        },
      },
    );

  const handleUpdate = (data: z.infer<typeof todoSchema>) => {
    updateMutation.mutate(
      {
        id: todoId,
        data,
      },
      {
        onSuccess: () => {
          toast({
            title: '할 일 수정',
            description: '할 일을 수정했습니다.',
          });
        },
      },
    );
  };

  useEffect(() => {
    todoForm.reset(todoDetail.data);
  }, [todoId]);

  return (
    <TodoPageLayout todos={todos.data}>
      <TodoForm
        className="flex grow flex-col gap-4 p-4"
        form={todoForm}
        onSubmit={handleUpdate}
        onError={(error) => console.log(error)}
      >
        <section className="flex justify-end gap-2">
          <Button type="button" variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
          <Button>수정</Button>
        </section>
      </TodoForm>
    </TodoPageLayout>
  );
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    invariant(params.todoId, 'No Todo ID provided');
    await queryClient.ensureQueryData(todosOptions.detail(params.todoId));
    return null;
  };

export default TodoDetailPage;
