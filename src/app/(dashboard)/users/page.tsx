"use client"
import { Box, Group, Pagination, Select, Table } from "@mantine/core";
import { EmailField, List } from '@refinedev/mantine';
import { EditButton, DeleteButton } from "@refinedev/mantine";

import { ColumnDef, flexRender } from "@tanstack/react-table";

import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnFilter, ColumnSorter } from "@components/Table";
import { IUser } from "@modules/users/types";

const page = () => {
    const columns = useMemo<ColumnDef<IUser>[]>(() => [
        {
            id: 'id',
            header: 'ID',
            accessorKey: 'id',
            maxSize:50
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

            
        },
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
        refineCoreProps: {
            resource: 'users'
        },
        columns
    })

    return (
        <List>
            <Box style={{ overflowX: 'auto' }}>


                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder && (
                                                <Group spacing="xs" noWrap>
                                                    <Box>
                                                        {flexRender(
                                                            header.column.columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                    </Box>
                                                    {header.id !== 'actions' && <Group spacing="xs" noWrap>
                                                        <ColumnSorter
                                                            column={header.column}
                                                        />
                                                        <ColumnFilter
                                                            column={header.column}
                                                        />
                                                    </Group>}
                                                </Group>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
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