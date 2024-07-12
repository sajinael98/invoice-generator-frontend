"use client"
import { Pagination, Table } from "@mantine/core";
import { WorkerResponseDto } from '@modules/workers/types';
import { DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from '@tanstack/react-table';
import React from 'react';

const WorkersListPage = () => {
  const columns = React.useMemo<ColumnDef<WorkerResponseDto>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: 'name',
        header: "Name",
        accessorFn: (item) => item.firstName + " " + item.lastName
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        enablePinning: true,
        cell: function render({ getValue }) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <EditButton recordItemId={getValue() as number} />
              <DeleteButton recordItemId={getValue() as number} />
            </div>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    refineCoreProps: {
      resource: "workers",
    },
    columns,
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        right: ['actions-column'],
      },
    }
  });
  console.log(pageCount, current)
  return (
    <List>
      <Table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  )
}

export default WorkersListPage