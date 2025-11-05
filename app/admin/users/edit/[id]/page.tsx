import { User } from '@/types/user';
import { AdminUserDetailsPage } from '@/components/admin-user-details';

export default async function AdminUserDetails({
  params
}: {
  params: Promise<{
    id: string;
  }>
}) {
  const { id } = await params;

  const user: User = {
    id: id,
    lastname: 'test',
    firstname: 'test',
    email: 'test',
    roles: ['admin'],
  }

  return <AdminUserDetailsPage data={user} update />
}