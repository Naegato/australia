import { User } from '@/types/user';
import { AdminUsersPage } from '@/components/admin-user';

export default function AdminUsers() {
  const users: User[] = (new Array(250)).fill(0).map((_, i) => ({
    id: `user-${i}`,
    firstname: `user-${i}`,
    lastname: `user-${i}`,
    email: `@-user-${i}`,
    roles: ['admin', 'user', 'content'],
  }))

  return <AdminUsersPage data={users} />;
}