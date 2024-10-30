import { queryOptions } from '@tanstack/react-query';
import { TodosService } from '../services/todos';

export const todosOptions = {
  all: ['todos'],
  list: () =>
    queryOptions({
      queryKey: todosOptions.all,
      queryFn: () => TodosService.getTodos(),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...todosOptions.all, id],
      queryFn: () => TodosService.getTodoById({ id }),
    }),
} as const;
