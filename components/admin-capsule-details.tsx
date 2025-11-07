'use client';

import { FC, useEffect, useState } from 'react';
import { cn, htmlToJson, jsonToHtml } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { Capsule } from '@/types/capsule';
import { Editor } from '@/components/blocks/editor-00/editor';
import { SerializedEditorState } from 'lexical';
import { Calendar } from './ui/calendar';
import { useDebouncedCallback } from '@/hooks/use-debounce-callback';

export const AdminCapsuleDetailsPage: FC<{
  data: Capsule,
  update?: boolean,
}> = ({
  data,
  update = false,
}) => {
  const [state, setState] = useState<Capsule>(data);
  const [editorState, setEditorState] = useState<SerializedEditorState>(JSON.parse(htmlToJson(data.content)));
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setEditorState(JSON.parse(htmlToJson(data.content)));
  }, [data]);

  const debouncedUpdate = useDebouncedCallback((newEditorState) => {
    setState(prev => ({
      ...prev,
      content: jsonToHtml(JSON.stringify(newEditorState)),
    }));
  }, 1000);

  useEffect(() => {
    debouncedUpdate(editorState);
  }, [JSON.stringify(editorState)]);


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
        <h1 className="text-2xl font-bold">Capsule {data.id}</h1>
      </div>
      <Field>
        <FieldLabel htmlFor="openingMessage">Message d&apos;ouverture</FieldLabel>
        <Input
          id="openingMessage"
          type="text"
          placeholder="Hello World!"
          required
          name="openingMessage"
          value={state.openingMessage}
          {...( !update && { readOnly: true })}
          {...( update && { onChange: (e) => {
            setState(prev => ({ ...prev, openingMessage: e.target.value}))
          } })}
        />
      </Field>
      <Field className="max-w-lg">
        <FieldLabel htmlFor="openingDate">Date d&apos;ouverture</FieldLabel>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </Field>
      <Field>
        <Input
          value={state.content ?? ''}
          type="hidden"
          name="content"
          readOnly
        />
        <Editor
          editorSerializedState={editorState}
          // onSerializedChange={(serializedState) => {
          //   setEditorState(serializedState);
          // }}
          {...( !update && { onSerializedChange: () => {} }) }
          {...( update && { onSerializedChange: (serializedState) => {
            setEditorState(serializedState);
          } })}
        />
      </Field>
      {update && <Field>
        <Button type="submit">Modifier</Button>
      </Field>}
    </FieldGroup>
  </form>
}