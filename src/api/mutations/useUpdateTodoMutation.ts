import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosService } from '../services/todos';
import { todosOptions } from '../query-options/todos';

const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodosService.updateTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: todosOptions.all,
      }),
  });
};

export { useUpdateTodoMutation };
