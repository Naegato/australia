import { Api } from '@/lib/api';
import { NewUser } from '@/types/user';

export class User {
  constructor(public readonly client: Api) {}

  async all() {
    return await fetch(`${this.client.url}/users`, {
      method: 'GET',
    })
  }

  async login(username: string, password: string) {
    return await fetch(`${this.client.url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
  }

  async register(user: NewUser) {
    return await fetch(`${this.client.url}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
  }
}