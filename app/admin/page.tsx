import { redirect } from 'next/navigation';

export default function Admin() {
  redirect('/admin/users');

  return <div>
    test
  </div>
}