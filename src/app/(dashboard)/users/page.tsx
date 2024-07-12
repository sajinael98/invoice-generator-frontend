"use client"

import TableBody from "@components/Table/TableBody";
import TableHeader from "@components/Table/TableHeader";
import { Box, Pagination, Table } from "@mantine/core";
import { IUser } from "@modules/users/types";
import { DeleteButton, EditButton, EmailField, List } from '@refinedev/mantine';
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const page = () => {
    const columns = useMemo<ColumnDef<IUser>[]>(() => [
        // {
        //     id: 'id',
        //     header: 'ID',
        //     accessorKey: 'id',
        //     maxSize: 50
            // meta: {
            //     filterElement: function render(props: any) {
            //         return (
            //             <Select
            //                 defaultValue="published"
            //                 data={[
            //                     { label: "Published", value: "published" },
            //                     { label: "Draft", value: "draft" },
            //                     { label: "Rejected", value: "rejected" },
            //                 ]}
            //                 {...props}
            //             />
            //         );
            //     },
            //     filterOperator: "eq",
            // },


        // },
        {
            id: 'name',
            header: 'Name',
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,

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
            id: 'role',
            header: 'Role',
            accessorKey: 'role'
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
        refineCore: { setCurrent, pageCount, current }
    } = useTable({
        columns
    })

    return (
        <List>
            <Box style={{ overflowX: 'auto' }}>
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
            </Box>
        </List>
    )
}

export default page