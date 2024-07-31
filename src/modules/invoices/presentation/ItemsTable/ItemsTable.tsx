import TableBody from '@components/Table/TableBody'
import TableHeader from '@components/Table/TableHeader'
import { ActionIcon, Button, Group, Pagination, Stack, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useInvoiceFormContext } from '@modules/invoices/infrastructure'
import { IItem } from '@modules/invoices/types'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import ItemFormModal from '../ItemFormModal/ItemFormModal'
import { randomId } from '@mantine/hooks';

function getPaginatedData(data: any[], page: number, pageSize: number) {
    const startIndex = (page) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
}

const AddItemButton = () => {
    const [opened, { close, open }] = useDisclosure()
    const { insertListItem } = useInvoiceFormContext()

    function addItemHandler(data: any) {
        data.id = randomId()
        insertListItem('items', data)
    }

    return <>
        <ItemFormModal
            opened={opened}
            onClose={close}
            onSave={addItemHandler}
        />
        <Button
            size='xs'
            leftIcon={<IconPlus />}
            onClick={() => {
                open()
            }}
        >
            Add Item
        </Button>
    </>
}

const ItemsTable = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 2,
    });
    const { getInputProps, removeListItem, insertListItem } = useInvoiceFormContext()
    
    const items = getInputProps('items').value
    const error = getInputProps('items').error
    const paginatedData = useMemo(() => getPaginatedData(items, pagination.pageIndex, pagination.pageSize), [pagination.pageIndex, pagination.pageSize, items])
    
    const columns = React.useMemo<ColumnDef<IItem>[]>(() => [
        {
            header: 'Mission',
            accessorKey: 'missionTitle'
        },
        {
            header: 'Hourly Rate',
            accessorKey: 'hourlyRate'
        },
        {
            header: 'Estimated Mins',
            accessorKey: 'estimatedMins'
        },
        {
            header: 'Action',
            accessorKey: 'id',
            cell({ row }) {
                const [opened, { open, close }] = useDisclosure(false)
                const index = row.index + pagination.pageIndex * pagination.pageSize

                function editHandler() {
                    open()
                }

                function editItem(data: any) {
                    removeListItem('items', index)
                    insertListItem('items', data, index)
                }
                
                function removeHandler() {
                    removeListItem('items', index)
                }
                return <>
                    <ItemFormModal
                        data={items[index]}
                        opened={opened}
                        onClose={close}
                        onSave={editItem}
                    />
                    <Group>
                        <ActionIcon onClick={editHandler}>
                            <IconEdit />
                        </ActionIcon>
                        <ActionIcon color='red' onClick={removeHandler}>
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                </>
            },
        }
    ], [pagination.pageIndex, pagination.pageSize, items])

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: paginatedData as any,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        state: {
            pagination,
        },
    })

    const tableData = getRowModel().rows
    return (
        <Stack my='md' >
            <Group position='apart' align='flex-end'>
                <Text fw={500}>
                    Items
                </Text>
                <AddItemButton />
            </Group>
            <Table>
                <TableHeader headerGroups={getHeaderGroups()} />
                <TableBody rows={tableData} />
            </Table>
            <Pagination
                total={Math.ceil(items.length / pagination.pageSize)}
                page={pagination.pageIndex + 1}
                onChange={(index) => {
                    setPagination(prev => ({ ...prev, pageIndex: index - 1 }))
                }}
            />

        </Stack>
    )
}

export default ItemsTable