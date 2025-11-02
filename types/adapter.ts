import { NewUser, User } from '@/types/user';
import { Capsule } from '@/types/capsule';

export type ApiResponse<T> = {
  data: T;
  error?: {
    code: number;
    message: string;
  }[];
};

export interface Adapter {
  getUser(token: string): Promise<ApiResponse<User>>;
  login(username: string, password: string): Promise<ApiResponse<{
    token: string;
  }>>;
  register(user: NewUser): Promise<ApiResponse<{
    token: string;
  }>>;
  getCapsules(token: string): Promise<ApiResponse<Capsule[]>>;
  getCapsule(token: string, id: string): Promise<ApiResponse<Capsule>>;
}