import { NumberInput, Select, SimpleGrid, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useWorkerFormContext } from '../infrastructure';
import { IUser } from '@modules/users/types';
import { useSelect } from "@refinedev/mantine";
import { WorkerResponseDto } from '../types';

const WorkerForm = () => {
    const { getInputProps, values } = useWorkerFormContext()

    const user = (values as WorkerResponseDto)?.userId

    const { selectProps } = useSelect<IUser>({
        resource: "users",
        defaultValue: user,
        onSearch: (value) => {
            return [
                {
                    field: "firstName",
                    operator: "eq",
                    value,
                },
            ]
        },
        optionValue: "id",
        optionLabel: "firstName",
        debounce: 500
    });

    return (
        <SimpleGrid
            breakpoints={[
                { minWidth: 980, cols: 2, spacing: 'md' },
                { maxWidth: 980, cols: 1, spacing: 'md' },
            ]}
        >
            <div>
                <Select
                    label="User"
                    placeholder="Select an user"
                    {...getInputProps("userId")}
                    {...selectProps}
                    withinPortal
                    searchable
                />
            </div>
            <br />
            <div>
                <TextInput
                    label="First Name"
                    {...getInputProps("firstName")}
                    
                />
            </div>
            <div>
                <TextInput
                    label="Last Name"
                    {...getInputProps("lastName")}
                    
                />
            </div>
            <div>
                <DatePicker
                    label="Join Date"
                    inputFormat='YYYY-MM-DD'
                    labelFormat='YYYY-MM-DD'
                    {...getInputProps("joinDate")}
                    withinPortal
                />
            </div>
            <div>
                <NumberInput
                    label="Daily Rate"
                    {...getInputProps("dailyRate")} />
            </div>
        </SimpleGrid>
    )
}

export default WorkerForm