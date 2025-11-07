'use client';

import { createColumnHelper, getCoreRowModel, Row } from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import { User } from '@/types/user';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Eye, Pencil } from 'lucide-react';
import { Capsule } from '@/types/capsule';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const columnHelper = createColumnHelper<Capsule>()

const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'Id',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('content', {
    id: 'content',
    header: 'content',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('openingDate', {
    header: 'Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('openingMessage', {
    header: 'Message',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('createdBy', {
    header: 'Créé par',
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => {
      return <RowActions row={props.row}/>;
    },
  }),
]

const RowActions = ({
  row,
}: {
  row: Row<Capsule>,
}) => {
  return <span>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Show content</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Capsule Content</DialogTitle>
        </DialogHeader>
        <div>
          <div dangerouslySetInnerHTML={{ __html: row.getValue('content') }} />
        </div>
      </DialogContent>
    </Dialog>
    <Link
      href={`/admin/capsules/${row.getValue('id')}`}
    >
      <Eye />
    </Link>
    <Link
      href={`/admin/capsules/edit/${row.getValue('id')}`}
    >
      <Pencil />
    </Link>
  </span>
}
export function AdminCapsulesPage({
  data: capsules,
}: {
  data: Capsule[],
}) {
  const [data, _setData] = useState([...capsules]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        id: false,
        content: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  })

  return <div className="p-5">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(row => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        {table.getFooterGroups().map(footerGroup => {
          return (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableFooter>
    </Table>
  </div>;
}