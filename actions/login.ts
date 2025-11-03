'use server';

import { z, ZodError } from "zod";
import { getApi } from '@/lib/adapter/inMemory';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  // const api = getApi();
  //
  // const response = await api.login(result.data?.email, result.data?.password);
  //
  // if (response?.error && response?.error?.length > 0) {
  //   return {
  //     data: prevState.data,
  //     toast: {
  //       type: 'error',
  //       message: response.error[0].message,
  //     },
  //   }
  // }

  // const cookieStore = await cookies();
  // cookieStore.set('auth_token', response?.data?.token);

  redirect('/home');

  return {
    data: prevState.data,
    toast: {
      type: 'success',
      message: 'Connexion réussie',
    },
    success: true,
  };
}