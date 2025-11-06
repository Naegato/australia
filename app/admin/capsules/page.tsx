import { AdminUsersPage } from '@/components/admin-user';
import { Capsule } from '@/types/capsule';
import dayjs from 'dayjs';
import { AdminCapsulesPage } from '@/components/admin-capsule';

export default function AdminUsers() {
  const capsules: Capsule[] = (new Array(250)).fill(0).map((_, i) => ({
    id: `capsule-${i + 1}`,
    openingDate: dayjs().add(i, 'day').format('YYYY-MM-DD'),
    content: `
      <p>
        test-${i + 1}
      </p>
    `,
    openingMessage: 'Some message',
    createdBy: 'user-123',
  }))

  return <AdminCapsulesPage data={capsules} />;
}