import { useUpdateTodoMutation } from '@/api/mutations/useUpdateTodoMutation';
import { todosOptions } from '@/api/query-options/todos';
import TodoForm from '@/components/domain/todo/todo-form';
import TodoPageLayout from '@/layouts/todo-page-layout';
import { todoSchema } from '@/schemas/todo-schema';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const TodoDetailPage = () => {
  const { todoId } = useParams() as { todoId: string };

  const [{ data: todos }, { data: todoDetail }] = useSuspenseQueries({
    queries: [todosOptions.list(), todosOptions.detail(todoId)],
  });

  const todoForm = useForm<z.infer<typeof todoSchema>>({
    defaultValues: todoDetail.data,
  });

  const updateMutation = useUpdateTodoMutation();

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
        submitButtonText="수정"
      />
    </TodoPageLayout>
  );
};

export default TodoDetailPage;
