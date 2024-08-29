"use client"

import { Select, SimpleGrid, TextInput } from "@mantine/core";
import { UserProvider, useUserForm } from "@modules/users/infrastructure/use-user-form";
import { UserForm } from "@modules/users/presentation";
import { UserRole } from "@modules/users/types";
import { CanAccess } from "@refinedev/core";
import { Create } from "@refinedev/mantine";

const CreateUserPage = () => {
  const form = useUserForm()
  
  return (
    <CanAccess resource="users" action="create" fallback={<div>fuck you</div>}>
      <Create title="New User" saveButtonProps={form.saveButtonProps} contentProps={{ px: 'xl' }}>
        <UserProvider form={form as any}>
          <UserForm />
        </UserProvider>
      </Create>
    </CanAccess>
  )
}

export default CreateUserPage