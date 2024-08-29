import { ActionIcon, Badge, Box, Button, Card, Group, Select, SelectItem, Text } from '@mantine/core'
import { useCounter, useDisclosure } from '@mantine/hooks'
import Timer from '@modules/invoices/presentation/Timer/Timer'
import { useAssignTaskWorker, useDoneTask, useStartTask, useStopTask } from '@modules/tasks/infrastructure'
import { ITask, TaskStatus } from '@modules/tasks/types'
import { useGetWorkersWithoutTasks } from '@modules/workers/infrastructure'
import { WorkerResponseDto } from '@modules/workers/types'
import { useResourceParams } from '@refinedev/core'
import { IconCheck } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'

interface TaskCardProps {
    task: ITask;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const { id: invoiceId } = useResourceParams()
    const [workerValue, onWorkerChange] = useState('');
    const [timer, { increment }] = useCounter(task.counter)
    const timerRef = useRef<any>()
    const [isAllowedFetchingWorkers, { open: allowFetchingWorkers, close: preventFetchingWorkers }] = useDisclosure(false)
    const [running, { open: startRunning, close: stopRunning }] = useDisclosure(task.status === TaskStatus.ACTIVE)
    const { isFetching: isWorkersFetching, data } = useGetWorkersWithoutTasks({ enabled: !workerValue && isAllowedFetchingWorkers })
    const { mutate: assignWorker } = useAssignTaskWorker({
        taskId: task.id,
        invoiceId: invoiceId as number
    })
    const { mutateAsync: startTask } = useStartTask({ invoiceId: invoiceId })
    const { mutateAsync: stopTask } = useStopTask({ invoiceId: invoiceId })
    const { mutateAsync: doneTask } = useDoneTask({ invoiceId: invoiceId })
    let workersList: SelectItem[] = []
    if (data && data.data) {
        workersList = data.data.map((worker: WorkerResponseDto) => ({ label: `${worker.firstName}`, value: worker.id }))
    }

    function confirmWorkerAssignmentHandler() {
        console.log(workerValue)
        assignWorker({
            workerId: parseInt(workerValue)
        })
    }

    function startHandler() {
        startTask({ taskId: task.id }).then(() => {
            startRunning()
        })
    }

    function stopHandler() {
        stopTask({ taskId: task.id, counter: timer }).then(() => {
            stopRunning()
        })
    }

    function doneHandler() {
        doneTask({ taskId: task.id, counter: timer }).then(() => {
            stopRunning()
        })
    }

    useEffect(() => {
        if (!workerValue) {
            preventFetchingWorkers()
        }
    }, [workerValue])

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                increment()
            }, 1000)
        }
        return () => clearInterval(timerRef.current)
    }, [running])

    return (
        <Card >
            <Card.Section p='md'>
                <Group position='apart' mb='md' align='flex-start'>
                    <div>
                        <Text weight={500}>Mission Title</Text>
                        <Text size="sm" color="dimmed">{task.missionTitle}</Text>
                    </div>
                    <Badge>
                        Estimated Mins: {task.estimatedTime}
                    </Badge>
                </Group>
                <Box mb='md'>
                    <Text weight={500}>Description</Text>
                    <Text size="sm" color="dimmed">
                        {task.note || 'No description'}
                    </Text>
                </Box>
                {task.workerName &&
                    <Box>
                        <Text weight={500}>Worker</Text>
                        <Text size="sm" color="dimmed">
                            {task.workerName}
                        </Text>
                    </Box>}
            </Card.Section>
            <Card.Section p='md' withBorder>
                {(task.status === TaskStatus.PENDING && !task.workerId) &&
                    <Group>
                        <Select
                            placeholder='Select worker'
                            disabled={isWorkersFetching}
                            onBlur={preventFetchingWorkers}
                            onClick={allowFetchingWorkers}
                            data={workersList}
                            onChange={(id) => {
                                if (id) {
                                    onWorkerChange(id)
                                }
                            }}
                            value={workerValue}
                            style={{ flex: 1 }}
                            withinPortal
                            clearable
                        />
                        <ActionIcon
                            variant='filled'
                            color='primary'
                            size='lg'
                            onClick={confirmWorkerAssignmentHandler}
                        >
                            <IconCheck />
                        </ActionIcon>
                    </Group>
                }
                {task.workerId && <Group position='apart' align='flex-end'>
                    <Timer time={timer} />
                    <Group spacing='xs'>
                        {(!running && [TaskStatus.PENDING, TaskStatus.PAUSESD].includes(task.status)) && <Button size='xs' onClick={startHandler}>
                            Start
                        </Button>}
                        {(running && task.status === TaskStatus.ACTIVE) && <Button size='xs' onClick={stopHandler}>
                            Stop
                        </Button>}
                        {[TaskStatus.ACTIVE, TaskStatus.PAUSESD].includes(task.status) && <Button size='xs' onClick={doneHandler}>
                            Done
                        </Button>}
                    </Group>
                </Group>}
            </Card.Section>
        </Card>
    )
}

export default TaskCard