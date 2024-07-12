"use client"

import TableBody from "@components/Table/TableBody";
import TableHeader from "@components/Table/TableHeader";
import { Pagination, Table } from "@mantine/core";
import { WorkerResponseDto } from '@modules/workers/types';
import { DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const WorkersListPage = () => {
  const columns = React.useMemo<ColumnDef<WorkerResponseDto>[]>(
    () => [
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
    columns
  });

  return (
    <List>
      <Table>
        <TableHeader headerGroups={getHeaderGroups} />
        <TableBody rowModel={getRowModel} />
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