import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosService } from '../services/todos';
import { todosOptions } from '../query-options/todos';

const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodosService.deleteTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: todosOptions.all,
      }),
  });
};

export { useDeleteTodoMutation };
