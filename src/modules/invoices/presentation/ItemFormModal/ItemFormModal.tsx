import { Button, Modal, NumberInput, Select, Stack, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useSelect } from '@refinedev/mantine'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { ItemFormModalProps } from './ItemFormModal.d'
import { useEffect, useMemo } from 'react'

const ItemFormModal = ({
    data = {
        missionId: '',
        missionTitle: '',
        hourlyRate: '',
        note: '',
        estimatedMins: ''
    },
    onClose,
    onSave,
    opened
}: ItemFormModalProps) => {
    const { getInputProps, onSubmit, reset, values, setValues } = useForm({
        initialValues: data
    })
    function closeHandler() {
        onClose()
    }

    const { selectProps, queryResult } = useSelect({
        resource: 'missions',
        defaultValue: "1",
        optionLabel: (item: any) => item.title,
        optionValue: (item: any) => item.id,
        onSearch(value) {
            if (value) {
                return [
                    {
                        field: 'title',
                        operator: 'eq',
                        value: value
                    }
                ]
            }
            return []
        },
    })
    function saveHandler() {
        onSubmit((data) => {
            onSave(data)
            reset()
            onClose()
        })()
    }

    const missionId = values.missionId
    const mission = useMemo(() => queryResult.data?.data.find(mission => mission.id === missionId), [queryResult.data?.data, missionId])
   
    useEffect(() => {
        if (mission) {
            setValues({
                hourlyRate: mission.hourlyRate,
                missionTitle: mission.title,
                estimatedMins: mission.estimatedMins
            })
        }
    }, [mission])

    return (
        <Modal
            opened={opened}
            onClose={closeHandler}
            title={data.id ? 'Edit Item' : 'New Item'}
        >
            <Stack>
                <Select
                    label='Mission'
                    {...getInputProps('missionId')}
                    {...selectProps}
                />
                <NumberInput
                    label='Hourly Rate'
                    {...getInputProps('hourlyRate')}
                />
                <Textarea
                    label='Note'
                    {...getInputProps('note')}
                />
                <Button style={{ alignSelf: 'flex-end' }} onClick={saveHandler} leftIcon={<IconDeviceFloppy />} size='sm' my='md'>
                    Save
                </Button>
            </Stack>

        </Modal>
    )
}

export default ItemFormModal