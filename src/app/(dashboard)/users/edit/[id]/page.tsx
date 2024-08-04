"use client"

import { Select, SimpleGrid, TextInput } from "@mantine/core";
import { useUpdateUserForm } from "@modules/users/infrastructure";
import { IRole } from "@modules/users/types";
import { CanAccess } from '@refinedev/core';
import { Edit, } from '@refinedev/mantine';
import { useEffect } from "react";

const EditUserPage = () => {
    const { register, formState: { errors }, saveButtonProps, refineCore: { redirect, queryResult } } = useUpdateUserForm()

    useEffect(() => {
        if (queryResult?.isError) {
            redirect('list')
        }
    }, [queryResult, redirect])

    useEffect(() => {
        register('id')
    }, [register])

    //role field
    const { onChange: onRoleChange, ...roleProps } = register("role")
    
    return (
        <CanAccess resource='users' action='edit'>
            <Edit saveButtonProps={saveButtonProps} headerButtonProps={{ display: 'none' }}>

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
                            {...roleProps}
                            onSelect={(e) => onRoleChange(e)}
                            data={Object.values(IRole)}
                        />
                    </div>
                </SimpleGrid>
            </Edit>
        </CanAccess>
    )
}

export default EditUserPage