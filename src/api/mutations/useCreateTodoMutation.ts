import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosService } from '../services/todos';
import { todosOptions } from '../query-options/todos';

const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodosService.createTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: todosOptions.all,
      }),
  });
};

export { useCreateTodoMutation };
