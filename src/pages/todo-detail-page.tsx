import { useDeleteTodoMutation } from '@/api/mutations/useDeleteTodoMutation';
import { useUpdateTodoMutation } from '@/api/mutations/useUpdateTodoMutation';
import { todosOptions } from '@/api/query-options/todos';
import TodoForm from '@/components/domain/todo/todo-form';
import { Button } from '@/components/ui/button';
import { ROUTER_PATHS } from '@/constants/router-paths';
import TodoPageLayout from '@/layouts/todo-page-layout';
import { todoSchema } from '@/schemas/todo-schema';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const TodoDetailPage = () => {
  const { todoId } = useParams() as { todoId: string };

  const [{ data: todos }, { data: todoDetail }] = useSuspenseQueries({
    queries: [todosOptions.list(), todosOptions.detail(todoId)],
  });

  const todoForm = useForm<z.infer<typeof todoSchema>>({
    defaultValues: todoDetail.data,
  });

  const navigate = useNavigate();
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const handleDelete = () =>
    deleteMutation.mutate(
      {
        id: todoId,
      },
      {
        onSuccess: () => navigate(ROUTER_PATHS.TODO),
      },
    );

  useEffect(() => {
    todoForm.reset(todoDetail.data);
  }, [todoId]);

  return (
    <TodoPageLayout todos={todos.data}>
      <TodoForm
        className="flex grow flex-col gap-4 p-4"
        form={todoForm}
        onSubmit={(data) => {
          updateMutation.mutate({
            id: todoId,
            data,
          });
        }}
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

export default TodoDetailPage;
