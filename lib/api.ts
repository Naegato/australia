import { User } from '@/lib/Api/user';
import { Capsule } from '@/lib/Api/capsule';

export class Api {
  public readonly user: User;
  public readonly capsule: Capsule;
  constructor(public readonly url: string) {
    this.user = new User(this);
    this.capsule = new Capsule(this);
  }
}

export const getApi = () => {
  return new Api('http://localhost:4000');
}