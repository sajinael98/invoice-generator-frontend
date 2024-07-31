import { NumberInput, SimpleGrid, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { useMissionFormContext } from '../infrastructure'

const MissionForm = () => {
    const { getInputProps } = useMissionFormContext()
    return (
        <SimpleGrid cols={2}>
            <TextInput
                label='Title'
                {...getInputProps('title')} />
            <NumberInput
                label='Hourly Rate'
                {...getInputProps('hourlyRate')} />
            <NumberInput
                label='Estimated Mins'
                {...getInputProps('estimatedMins')} />
            <Textarea
                label='Description'
                placeholder='Write the mission description'
                {...getInputProps('description')} />
        </SimpleGrid>
    )
}

export default MissionForm