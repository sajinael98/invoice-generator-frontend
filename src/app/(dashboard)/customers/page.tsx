"use client"

import TableBody from '@components/Table/TableBody';
import TableHeader from '@components/Table/TableHeader';
import { Pagination, Table } from '@mantine/core';
import { CustomerResponse } from '@modules/customers/types';
import { DeleteButton, EditButton, EmailField, List } from '@refinedev/mantine';
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from 'react';

const CustomersListPage = () => {
    const columns = useMemo<ColumnDef<CustomerResponse>[]>(() => [
        {
            id: 'name',
            header: 'Name',
            accessorFn: (row) => `${row.firstName} ${row.lastName}`
        },
        {
            id: 'city',
            header: 'City',
            accessorKey: 'city'
        },
        {
            id: 'email',
            header: 'Email',
            accessorKey: 'email',
            cell: function render({ getValue }) {
                return <EmailField value={getValue() as string} />
            }
        },
        {
            id: "actions",
            accessorKey: "id",
            header: "Actions",
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
    ], [])

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },

    } = useTable({
        columns
    })

    return (
        <List>
            <Table>
                <TableHeader headerGroups={getHeaderGroups} />
                <TableBody rowModel={getRowModel} />
            </Table>
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    )
}

export default CustomersListPage