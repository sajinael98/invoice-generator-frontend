import { Select, TextInput } from '@mantine/core'
import { SimpleGrid } from '@mantine/core'
import { useUserFormContext } from '@modules/users/infrastructure'
import { UserRole, IUser } from '@modules/users/types'
import React from 'react'

const UserForm = () => {
    const { getInputProps, values } = useUserFormContext()
    
    return (
        <SimpleGrid
            cols={4}
            spacing="lg"
            breakpoints={[
                { minWidth: 980, cols: 2, spacing: 'md' },
                { maxWidth: 980, cols: 1, spacing: 'md' },
            ]}
        >
            <div>
                <TextInput
                    label='First Name'
                    {...getInputProps("firstName")}
                />
            </div>
            <div>
                <TextInput
                    label='Last Name'

                    {...getInputProps("lastName")}
                />
            </div>
            <div>
                <TextInput
                    label='Email'
                    {...getInputProps("email")}
                />
            </div>
            <div>
                <Select
                    label="Role"
                    placeholder="Pick one"
                    data={Object.values(UserRole)}
                    {...getInputProps("role")}
                />
            </div>
            {!(values as IUser).id &&
                <div>
                    <TextInput
                        label='Password'
                        {...getInputProps("password")} />
                </div>}
        </SimpleGrid>
    )
}

export default UserForm