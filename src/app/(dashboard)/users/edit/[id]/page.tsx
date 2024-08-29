"use client"

import { Select, SimpleGrid, TextInput } from "@mantine/core";
import { UserProvider, useUserForm } from "@modules/users/infrastructure";
import { UserForm } from "@modules/users/presentation";
import { UserRole } from "@modules/users/types";
import { CanAccess } from '@refinedev/core';
import { Edit, } from '@refinedev/mantine';
import { useEffect } from "react";

const EditUserPage = () => {
    const form = useUserForm()
    return (
        <CanAccess resource='users' action='edit'>
            <Edit saveButtonProps={form.saveButtonProps} headerButtonProps={{ display: 'none' }}>
                <UserProvider form={form as any}>
                    <UserForm />
                </UserProvider>
            </Edit>
        </CanAccess>
    )
}

export default EditUserPage