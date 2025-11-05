'use client';

import { FC, useState } from 'react';
import { User } from '@/types/user';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from '@/components/ui/password-input';
import Link from 'next/link';

export const AdminUserDetailsPage: FC<{
  data: User,
  update?: boolean,
}> = ({
  data,
  update = false,
}) => {
  const [state, setState] = useState<User & {
    password?: string,
    confirmPassword?: string,
  }>(data);

  return <form
    className={cn("flex flex-col gap-6 p-5")}
    {...(!update && { onSubmit: (e) => { e.preventDefault() } })}
  >
    <FieldGroup>
      <div className="flex flex-col items-center gap-1 text-center">
        <Link href="/admin/users">
          Retour
        </Link>
        {!update && <Link href={`/admin/users/edit/${data.id}`}>
          Edit
        </Link>}
        <h1 className="text-2xl font-bold">{data.firstname} {data.lastname}</h1>
      </div>
      <Field>
        <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
        <Input
          id="firstname"
          type="text"
          placeholder="John"
          required
          name="firstname"
          value={state.firstname}
          {...( !update && { readOnly: true })}
          {...( update && { onChange: (e) => {
            setState(prev => ({ ...prev, firstname: e.target.value}))
          } })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="lastname">Nom</FieldLabel>
        <Input
          id="lastname"
          type="text"
          placeholder="Doe"
          name="lastname"
          required
          value={state.lastname}
          {...( !update && { readOnly: true })}
          {...( update && { onChange: (e) => {
              setState(prev => ({ ...prev, lastname: e.target.value}))
            } })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="Doe"
          name="email"
          required
          value={state.email}
          {...( !update && { readOnly: true })}
          {...( update && { onChange: (e) => {
              setState(prev => ({ ...prev, email: e.target.value}))
            } })}
        />
      </Field>
      {update && <>
        <Field>
          <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          <PasswordInput
            id="password"
            required
            value={state?.password || ''}
            onChange={(e) => {
              setState(prev => ({ ...prev, password: e.target.value }))
            }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Mot de passe</FieldLabel>
          <PasswordInput
            id="confirm-password"
            required
            value={state?.confirmPassword || ''}
            onChange={(e) => {
              setState(prev => ({ ...prev, confirmPassword: e.target.value }))
            }}
          />
        </Field>
      </>}
      {update && <Field>
          <Button type="submit">Modifier</Button>
      </Field>}
    </FieldGroup>
  </form>
}