import { NumberInput, Select, SimpleGrid, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IUser, UserRole } from '@modules/users/types';
import { useWorkerFormContext } from '@modules/workers/infrastructure';
import { WorkerResponseDto } from '@modules/workers/types';
import { useSelect } from "@refinedev/mantine";
import { useEffect, useMemo, useState } from 'react';

const WorkerForm = () => {
    const { getInputProps, values, setValues } = useWorkerFormContext()
    const userId = (values as WorkerResponseDto)?.userId
    const [isAllowedFetchingUsers, { open: allowedFetchingUsers, close: preventFetchingUsers }] = useDisclosure(false)

    const { selectProps, queryResult: { data: users, isFetching, },} = useSelect({
        resource: 'users',
        optionLabel: (item: any) => `${item.firstName} ${item.lastName}`,
        optionValue: (item) => item.id,
        defaultValue: userId,
        onSearch(value) {
            const filters: any[] = [
                {
                    field: 'role',
                    operator: 'eq',
                    value: UserRole.WORKER
                }
            ]
            if (value) {
                const splitedValue = value.split(" ");
                switch (splitedValue.length) {
                    case 1: {
                        filters.push(
                            {
                                field: 'firstName',
                                operator: 'eq',
                                value
                            }
                        )
                        break;
                    }
                    case 2: {
                        filters.push({
                            field: 'firstName',
                            operator: 'eq',
                            value: splitedValue[0]
                        })
                        filters.push({
                            field: 'lastName',
                            operator: 'eq',
                            value: splitedValue[1]
                        })
                        break;
                    }
                }
            }
            return filters;
        },
        queryOptions: {
            enabled: isAllowedFetchingUsers
        },
        defaultValueQueryOptions: {
            enabled: isAllowedFetchingUsers
        }
    })

    const selectedUser = useMemo(() => users?.data.find(user => user.id === userId), [users?.data, userId])

    useEffect(() => {
        if (selectedUser) {
            setValues({
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName
            })
        }
    }, [selectedUser])
    useEffect(() => {
        if (userId) {
            allowedFetchingUsers()
        }
    }, [userId])
    return (
        <SimpleGrid
            breakpoints={[
                { minWidth: 980, cols: 2, spacing: 'md' },
                { maxWidth: 980, cols: 1, spacing: 'md' },
            ]}
        >

            <Select
                label="User"
                placeholder="Select an user"
                onBlur={preventFetchingUsers}
                onClick={allowedFetchingUsers}
                {...getInputProps("userId")}
                {...selectProps}
                disabled={isFetching}
                withinPortal
                searchable
            />

            <br />

            {selectedUser && <>
                <TextInput
                    label="First Name"
                    {...getInputProps("firstName")}

                />

                <TextInput
                    label="Last Name"
                    {...getInputProps("lastName")}

                />
            </>}

            <DatePicker
                label='Joined Date'
                {...getInputProps("joinedDate")}
                withinPortal
            />
            <NumberInput
                label="Daily Rate"
                {...getInputProps("dailyRate")} />

        </SimpleGrid>
    )
}

export default WorkerForm