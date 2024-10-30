import { useCreateTodoMutation } from '@/api/mutations/useCreateTodoMutation';
import { todosOptions } from '@/api/query-options/todos';
import TodoForm from '@/components/domain/todo/todo-form';
import TodoPageLayout from '@/layouts/todo-page-layout';
import { todoSchema } from '@/schemas/todo-schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const TodoPage = () => {
  const todoForm = useForm<z.infer<typeof todoSchema>>();
  const createMutation = useCreateTodoMutation();

  const { data: todos } = useSuspenseQuery(todosOptions.list());

  return (
    <TodoPageLayout todos={todos.data}>
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
    </TodoPageLayout>
  );
};

export default TodoPage;
