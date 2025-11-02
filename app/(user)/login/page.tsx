'use client';

import { useActionState, useCallback, useEffect, useMemo, useState } from 'react';
import { login, LoginDTO } from '@/actions/login';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  const [data, setData] = useState<LoginDTO>({
    email: '',
    password: '',
  });

  const [state, formAction, isPending] = useActionState(login, {
    data: {
      email: '',
      password: '',
    },
  });

  const errs = useMemo(() => {
    return state.errors || [];
  }, [state])

  const getErrorMessage = useCallback((field: string) => {
    const error = errs.find((e) => e.path[0] === field);
    return error ? error.message : null;
  }, [errs]);

  useEffect(() => {
    if (state?.toast) {
      toast[state.toast.type](state.toast.message);
    }
  }, [state?.toast]);

  return <div className="w-full h-dvh flex flex-col justify-center items-center gap-8">
    <h1 className="text-5xl font-script text-pink-dark">Connexion</h1>
    <form  action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </Label>
        <div className="w-full bg-input rounded-lg">
          <Input
            name="email"
            id="email"
            placeholder="votre@email.com"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            autoComplete="email"
            className="w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {getErrorMessage('email') && <p>
          <span className="text-sm text-red-600">{getErrorMessage('email')}</span>
        </p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground">
          Mot de passe
        </Label>
        <div className="w-full bg-input rounded-lg">
          <PasswordInput
            name="password"
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full px-4 py-3 text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {getErrorMessage('password') && <p>
          <span className="text-sm text-red-600">{getErrorMessage('password')}</span>
        </p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-medium"
        disabled={isPending}
      >
        Se connecter
      </Button>
    </form>

    <div className="text-center space-y-4">
      <Link className="text-sm text-muted-foreground hover:text-foreground" href="/forgot-password">Mot de passe oublié ?</Link>

      <div className="pt-4">
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  </div>;
}