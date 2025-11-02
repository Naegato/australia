export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
}

export type NewUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}