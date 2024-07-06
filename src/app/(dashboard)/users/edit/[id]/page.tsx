"use client"

import { Select, SimpleGrid, TextInput } from "@mantine/core";
import { useUpdateUserForm } from "@modules/users/infrastructure";
import { IRole } from '@modules/users/types';
import { CanAccess } from '@refinedev/core';
import { Edit } from '@refinedev/mantine';

const EditUserPage = () => {
    const { register, formState: { errors }, saveButtonProps } = useUpdateUserForm()
    
    //role field
    const { onChange, ...roleProps } = register("role")

    return (
        <CanAccess resource='users' action='edit'>
            <Edit saveButtonProps={saveButtonProps} >
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
                            error={errors['firstName']?.message as string}
                            {...register("firstName")} />
                    </div>
                    <div>
                        <TextInput
                            label='Last Name'
                            error={errors['lastName']?.message as string}
                            {...register("lastName")}
                        />
                    </div>
                    <div>
                        <TextInput
                            label='Email'
                            error={errors['email']?.message as string}
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <Select
                            label="Role"
                            placeholder="Pick one"
                            {...roleProps}
                            onSelect={onChange}
                            data={[
                                { label: "User", value: IRole.USER.toString() },
                                { label: "Admin", value: IRole.ADMIN.toString() },
                                { label: "Manager", value: IRole.Manager.toString() },
                            ]}
                        />
                    </div>
                </SimpleGrid>
            </Edit>
        </CanAccess>
    )
}

export default EditUserPage