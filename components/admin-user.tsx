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

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'Id',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('firstname', {
    header: 'Prénom',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastname', {
    header: 'Nom',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('roles', {
    header: 'Role',
    cell: info => {

      return <span className="flex gap-2 flex-wrap text-white">
        {info.getValue().map(r => {
          return <span key={r} className={cn(
            "bg-muted-foreground py-1 px-2 text-xs rounded-full font-bold",
            r === 'admin' && 'bg-red-400',
            r === 'user' && 'bg-green-400',
            r === 'content' && 'bg-blue-400',
          )}>
            {r}
          </span>
        })}
      </span> ;
    },
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
  row: Row<User>,
}) => {
  console.log(row, row.getValue('id'));

  return <span>
    <Link
      href={`/admin/users/${row.getValue('id')}`}
    >
      <Eye />
    </Link>
    <Link
      href={`/admin/users/edit/${row.getValue('id')}`}
    >
      <Pencil />
    </Link>
  </span>
}
export function AdminUsersPage({
  data: users,
}: {
  data: User[],
}) {
  const [data, _setData] = useState([...users]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <div className="p-5">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              if(header.id === 'id') {
                return <Fragment key={header.id} />;
              }
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
          if(row.id === 'id') {
            return <Fragment key={row.id} />;
          }

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
          if(footerGroup.id === 'id') {
            return <Fragment key={footerGroup.id} />;
          }

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