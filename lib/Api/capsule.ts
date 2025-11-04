import { Api } from '@/lib/api';

export class Capsule {
  constructor(public readonly client: Api) {}

  async all() {
    return await fetch(`${this.client.url}/capsules`, {
      method: 'GET',
    })
  }

  async findByCurrentMonth() {
    return await fetch(`${this.client.url}/capsules/month`, {
      method: 'GET',
    })
  }

  async findByDay(day: string) {
    return await fetch(`${this.client.url}/capsules/day/${day}`, {
      method: 'GET',
    })
  }

  async findById(id: string) {
    return await fetch(`${this.client.url}/capsules/${id}`, {
      method: 'GET',
    })
  }
}