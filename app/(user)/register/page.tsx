'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useActionState, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { register, RegisterDTO } from '@/actions/register';

export default function RegisterPage() {
  const [data, setData] = useState<RegisterDTO>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [state, formAction, isPending] = useActionState(register, {
    data: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    <h1 className="text-5xl font-script text-pink-dark">Inscription</h1>
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstname" className="text-sm font-medium text-foreground">
          Prénom
        </Label>
        <div className="w-full bg-input rounded-lg">
          <Input
            id="firstname"
            name="firstname"
            type="text"
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
            autoComplete="firstname"
            placeholder="xxxxxxx"
            className="w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {getErrorMessage('firstname') && <p>
          <span className="text-sm text-red-600">{getErrorMessage('firstname')}</span>
        </p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastname" className="text-sm font-medium text-foreground">
          Nom
        </Label>
        <div className="w-full bg-input rounded-lg">
          <Input
            id="lastname"
            name="lastname"
            type="text"
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
            autoComplete="lastname"
            placeholder="xxxxxxx"
            className="w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {getErrorMessage('lastname') && <p>
          <span className="text-sm text-red-600">{getErrorMessage('lastname')}</span>
        </p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </Label>
        <div className="w-full bg-input rounded-lg">
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="xxxxxxx@xxxxxx.xxxxx"
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
            id="password"
            placeholder="••••••••"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="current-password"
            className="w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {getErrorMessage('password') && <p>
          <span className="text-sm text-red-600">{getErrorMessage('password')}</span>
        </p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
          Confirmer le mot de passe
        </Label>
        <div className="w-full bg-input rounded-lg">
          <PasswordInput
            id="confirm-password"
            placeholder="••••••••"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            autoComplete="confirm-password"
            className="w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {getErrorMessage('confirmPassword') && <p>
          <span className="text-sm text-red-600">{getErrorMessage('confirmPassword')}</span>
        </p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-medium"
        disabled={isPending}
      >
        S&apos;inscrire
      </Button>
    </form>

    <div className="text-center">
      <p className="text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  </div>
}