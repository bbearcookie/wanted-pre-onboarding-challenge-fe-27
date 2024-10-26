type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTodosResponse = Todo[];

export type GetTodoByIdResponse = Todo;

export type CreateTodoRequest = { title: string; content: string };
export type CreateTodoResponse = Todo;

export type UpdateTodoRequest = { title: string; content: string };
export type UpdateTodoResponse = Todo;
