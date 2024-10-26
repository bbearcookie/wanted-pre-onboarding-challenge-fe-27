import api from '@/lib/ky-client';
import {
  GetTodosResponse,
  GetTodoByIdResponse,
  CreateTodoResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from '../dtos/todos';

export abstract class TodosService {
  static async getTodos() {
    return await api.get<GetTodosResponse>('todos').json();
  }

  static async getTodoById(params: { id: string }) {
    return await api.get<GetTodoByIdResponse>(`todos/${params.id}`).json();
  }

  static async createTodo(params: { body: CreateTodoRequest }) {
    return await api
      .post<CreateTodoResponse>('todos', { json: params.body })
      .json();
  }

  static async updateTodo(params: { id: string; body: UpdateTodoRequest }) {
    return await api
      .put<UpdateTodoResponse>(`todos/${params.id}`, { json: params.body })
      .json();
  }

  static async deleteTodo(params: { id: string }) {
    return await api.delete<null>(`todos/${params.id}`).json();
  }
}
