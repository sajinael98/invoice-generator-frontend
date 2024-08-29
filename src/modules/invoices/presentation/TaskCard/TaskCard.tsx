import { ActionIcon, Badge, Card, Group, Select, Text } from '@mantine/core'
import { Task } from '@modules/invoices/types'
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react'
import Timer from '../Timer/Timer'
import { useCounter, useDisclosure } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useGetWorkersWithoutTasks } from '@modules/workers/infrastructure';


interface TaskCardProps {
    data: Task;
    onStart: (id: number) => void;
    onPause: (id: number) => void
    onDone: (id: number) => void
    onSelectWorker: (id: number, workerId: number) => void
}

const TaskCard = ({ data }: TaskCardProps) => {
    const [running, { open: startRunning, close: stopRunning }] = useDisclosure()
    const [fetchingWorkers, { open: startFetchingWorkers, close: stopFetchingWorkers }] = useDisclosure()
    const [timer, { increment }] = useCounter(data.counter)
    const timerRef = useRef<any>()

    const { data: workersRes, isFetching } = useGetWorkersWithoutTasks({
        enabled: fetchingWorkers
    })

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                increment()
            }, 1000)
        }
        return () => clearInterval(timerRef.current)
    }, [running])

    const workers = (workersRes && workersRes.data.map((w: any) => ({ label: `${w.firstName} ${w.lastName}`, value: w.id }))) ?? []
    return (
        <Card bg={'dark.6'}>
            <Card.Section p='md' withBorder>
                <Group position='apart'>
                    <Text size='sm'>{data.missionTitle}</Text>
                    <Badge size='xs'>
                        Estimated Time: {data.estimatedTime}min
                    </Badge>
                </Group>
            </Card.Section>
            <Text size='sm' mt='md'>Note</Text>
            <Text c='dimmed' mb='md' size='xs'>{data.note ? data.note : 'No description'}</Text>
            <Card.Section p='md' withBorder>
                <Group position='apart' align='flex-end' >
                    {!data.workerId &&
                        <Select
                            onBlur={stopFetchingWorkers}
                            onClick={startFetchingWorkers}
                            data={workers}
                            disabled={isFetching}
                            withinPortal
                        />
                    }
                    {data.workerId && <>
                        <div>
                            <Text size='sm'>Worker</Text>
                            <Text c='dimmed' size='xs'>{data.workerName}</Text>
                        </div>
                        <Timer
                            time={timer}
                        />
                        {!running && <ActionIcon variant='filled' bg='primary' >
                            <IconPlayerPlayFilled />
                        </ActionIcon>}
                        {running && <ActionIcon variant='filled' bg='primary' >
                            <IconPlayerPauseFilled />
                        </ActionIcon>}
                    </>}

                </Group>
            </Card.Section>
        </Card >
    )
}

export default TaskCard