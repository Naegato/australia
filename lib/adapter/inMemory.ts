import { Adapter, ApiResponse } from '@/types/adapter';
import { Capsule } from '@/types/capsule';
import { NewUser, User } from '@/types/user';
import { Api } from '@/lib/api';

export class InMemoryAdapter implements Adapter {
  public readonly users: User[] = [
    {
      id: '1',
      firstname: 'maxime',
      lastname: 'wiatr',
      email: 'maxime.wiatr@gmail.com',
      roles: ['user', 'admin'],
    }
  ];
  public readonly capsules: Capsule[] = [];

  async getUser(token: string): Promise<ApiResponse<User>> {
    const id = token.replace('token-', '');
    const user = this.users.find(u => u.id === id);
    if (user) {
      return {
        data: user,
      };
    } else {
      return {
        data: {} as User,
        error: [{
          code: 404,
          message: 'User not found',
        }],
      };
    }
  }
  async login(username: string, password: string): Promise<ApiResponse<{ token: string; }>> {
    const user = this.users.find(u => u.email === username);
    if (user) {
      return {
        data: {
          token: `token-${user.id}`,
        },
      };
    } else {
      return {
        data: {} as { token: string; },
        error: [{
          code: 401,
          message: 'Invalid credentials',
        }],
      };
    }
  }
  async register(user: NewUser): Promise<ApiResponse<{ token: string; }>> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: ['user'],
    }
    this.users.push(newUser);
    return {
      data: {
        token: `token-${newUser.id}`,
      },
    };
  }
  getCapsules(token: string): Promise<ApiResponse<Capsule[]>> {
      throw new Error('Method not implemented.');
  }
  getCapsule(token: string, id: string): Promise<ApiResponse<Capsule>> {
      throw new Error('Method not implemented.');
  }
}

export const getApi = () => {
  const adapter = new InMemoryAdapter();
  return new Api(adapter);
}