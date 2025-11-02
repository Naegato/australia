import { Adapter } from '@/types/adapter';
import { NewUser } from '@/types/user';

export class Api {
  constructor(private readonly adapter: Adapter) {

  }

  async getUser(token: string) {
    return await this.adapter.getUser(token);
  }

  async login(username: string, password: string) {
    return await this.adapter.login(username, password);
  }

  async register(user: NewUser) {
    return await this.adapter.register(user);
  }

  async getCapsules(token: string) {
    return await this.adapter.getCapsules(token);
  }

  async getCapsule(token: string, id: string) {
    return await this.adapter.getCapsule(token, id);
  }
}