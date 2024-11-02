import { useCreateTodoMutation } from '@/api/mutations/useCreateTodoMutation';
import { todosOptions } from '@/api/query-options/todos';
import TodoForm from '@/components/domain/todo/todo-form';
import { Button } from '@/components/ui/button';
import { ROUTER_PATHS } from '@/constants/router-paths';
import TodoPageLayout from '@/layouts/todo-page-layout';
import { todoSchema } from '@/schemas/todo-schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const TodoPage = () => {
  const todoForm = useForm<z.infer<typeof todoSchema>>();
  const navigate = useNavigate();
  const createMutation = useCreateTodoMutation();

  const { data: todos } = useSuspenseQuery(todosOptions.list());

  return (
    <TodoPageLayout todos={todos.data}>
      <TodoForm
        className="flex grow flex-col gap-4 p-4"
        form={todoForm}
        onSubmit={(data) => {
          createMutation.mutate(
            {
              data,
            },
            {
              onSuccess: (res) =>
                navigate(ROUTER_PATHS.TODO_DETAIL(res.data.id)),
            },
          );
        }}
        onError={(error) => console.log(error)}
      >
        <section className="flex justify-end">
          <Button>추가</Button>
        </section>
      </TodoForm>
    </TodoPageLayout>
  );
};

export default TodoPage;
