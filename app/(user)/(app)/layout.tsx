import { cookies } from 'next/headers';
import { getApi } from '@/lib/adapter/inMemory';
import { redirect } from 'next/navigation';
import { LoggedLayout } from '@/components/layout/logged';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();

  const authToken = cookiesStore.get('auth_token');

  console.log('authToken', authToken);
  const api = getApi();
  const user = await api.getUser(authToken?.value || '');

  console.log('user', user);

  if (!authToken?.value || user?.error) {
    redirect('/login');
  }

  return <>
    {children}
  </>;
}