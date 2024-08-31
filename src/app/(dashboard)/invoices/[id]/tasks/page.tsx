"use client"

import { Box, Button, Group, Paper, Select, SimpleGrid, Text } from '@mantine/core'
import { Task, TaskStatus } from '@modules/invoices/types'
import { TaskList } from '@modules/tasks/presentation'
import { ITask } from '@modules/tasks/types'
import { api } from '@providers/data-provider'
import { HttpError, useNotification, useOne, useResourceParams } from '@refinedev/core'
import { IconCalendar, IconCheck, IconChecklist, IconHourglass, IconInvoice, IconPencil, IconUser } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

const State = ({ title, icon: Icon, data }: { title: string, icon: any, data: number }) => <Paper bg='dark.6' withBorder p="md" radius="md">
    <Group position='apart'>
        <Text size='xs' tt='uppercase' fw={500} c='dimmed'>
            {title}
        </Text>
        <Icon size='1.2rem' />
    </Group>
    <Text mt='xl' size='xl' fw={700}>
        {data}
    </Text>
</Paper>

const TasksPage = () => {
    const { open } = useNotification()
    const { id: invoiceId } = useResourceParams()
    const [selectedStatus, setSelectedStatus] = useState<string | null>('All');
    const { data: invoice, isLoading: isLo, isError } = useOne<any, HttpError>({
        resource: "invoices",
        id: invoiceId,
    });
    const { data, isLoading } = useQuery({
        queryKey: ['invoices', invoiceId, 'tasks'],
        queryFn: () => api.get(`/backend-api/invoices/${invoiceId}/tasks`).then(data => data.data),
        refetchInterval: 60000,
        enabled: !!invoice
    })
    const filteredTasks = useMemo(() => {
        if (selectedStatus == 'All') {
            return data
        }
        return data.filter((task: ITask) => task.status === selectedStatus)
    }, [data, selectedStatus])

    const tasksCount = useMemo(() => data && data.length || 0, [data])
    const nonStartedTasksCount = useMemo(() => data && data.filter((task: Task) => task.status === TaskStatus.PENDING).length || 0, [data])
    const startedTasksCount = useMemo(() => data && data.filter((task: Task) => task.status === TaskStatus.ACTIVE).length || 0, [data, selectedStatus])
    const completedTasksCount = useMemo(() => data && data.filter((task: Task) => task.status === TaskStatus.COMPLETED).length || 0, [data, selectedStatus])

    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <>
            <Paper mb='md' withBorder p='md'>
                <Text fz={24} fw={500}>Summary</Text>

                <Box pl='xs'>
                    <Group spacing={5}>
                        <IconInvoice size={'1rem'} />
                        <Text fz='lg' >Invoice: </Text>
                        <Text c='dimmed'>{invoice.data.id}</Text>
                    </Group>
                    <Group spacing={5}>
                        <IconCalendar size={'1rem'} />
                        <Text fz='lg' >Invoice Date: </Text>
                        <Text c='dimmed'>{invoice.data.requiredDate}</Text>
                    </Group>
                    <Group spacing={5}>
                        <IconUser size={'1rem'} />
                        <Text fz='lg' >Customer: </Text>
                        <Text c='dimmed'>{invoice?.data.customerName}</Text>
                    </Group>
                </Box>

                <SimpleGrid mt='md' cols={4}>
                    <State title='Tasks' icon={IconChecklist} data={tasksCount} />
                    <State title='Non started Tasks' icon={IconHourglass} data={nonStartedTasksCount} />
                    <State title='In progress Tasks' icon={IconPencil} data={startedTasksCount} />
                    <State title='Completed Tasks' icon={IconCheck} data={completedTasksCount} />
                </SimpleGrid>

            </Paper>

            <Group position='right' mb='md'>
                <Select value={selectedStatus} onChange={setSelectedStatus} data={['All', 'PENDING', 'ACTIVE', 'PAUSESD', 'COMPLETED']} />
                <Button>
                    Start All
                </Button>
                <Button variant='light'>
                    Complete All
                </Button>
            </Group>
            <TaskList tasks={filteredTasks} />
        </>

    )
}

export default TasksPage