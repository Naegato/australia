'use server';

import { z, ZodError } from "zod";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getApi } from '@/lib/api';
import { parseJwt } from '@/lib/utils';
import { User } from '@/types/user';

const schema = z.object({
  email: z.email('Email invalide').min(1, 'L\'email est requis'),
  password: z.string().min(6, 'Le mot de passe est requis'),
})

export type LoginDTO = z.infer<typeof schema>;

export type LoginActionState = {
  errors?: ZodError<LoginDTO>['issues'],
  data: LoginDTO,
  toast?: {
    type: 'success' | 'error',
    message: string,
  },
  success: boolean,
}

export async function login(prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const formDataObject = Object.fromEntries(formData.entries());
  const result = schema.safeParse(formDataObject);

  if (result.error) {
    return {
      errors: result.error.issues,
      data: prevState.data,
      toast: {
        type: 'error',
        message: 'Veuillez corriger les erreurs dans le formulaire.',
      },
      success: false,
    };
  }

  const res = await getApi().user.login(result?.data?.email,result?.data?.password);

  if (!res.ok) {
    return {
      data: prevState.data,
      toast: {
        type: 'error',
        message: 'Une erreur est survenue.',
      },
      success: false,
    };
  }

  const resData = await res.json();

  console.log(resData);
  const decoded: Pick<User, 'id' | 'roles' | 'email'> = parseJwt(resData.token);

  const cookieStore = await cookies();
  cookieStore.set('auth_token', resData?.token);

  if (decoded.roles.includes('admin')) {
    redirect('/admin');
  } else {
    redirect('/home');
  }

  return {
    data: prevState.data,
    toast: {
      type: 'success',
      message: 'Connexion réussie',
    },
    success: true,
  };
}