import { SimpleGrid } from '@mantine/core'
import { ITask } from '@modules/tasks/types'
import React from 'react'
import TaskCard from '../TaskCard'

interface TaskListProps {
    tasks: ITask[]
}

const TaskList = ({ tasks }: TaskListProps) => {
    return (
        <SimpleGrid cols={3}>
            {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </SimpleGrid>
    )
}

export default TaskList