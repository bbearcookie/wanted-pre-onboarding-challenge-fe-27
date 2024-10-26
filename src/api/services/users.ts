import api from '@/lib/ky-client';
import { LoginRequest, SignUpRequest } from '../dtos/users';

export abstract class UsersService {
  static async login(params: { data: LoginRequest }) {
    return await api
      .post<{
        message: string;
        token: string;
      }>('users/login', { json: params.data })
      .json();
  }

  static async signUp(params: { data: SignUpRequest }) {
    return await api
      .post<{
        message: string;
        token: string;
      }>('users/create', { json: params.data })
      .json();
  }
}
