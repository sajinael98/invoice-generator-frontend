"use client"

import { Select, SimpleGrid, TextInput } from "@mantine/core";
import { useCreateUserForm } from "@modules/users/infrastructure";
import { IRole } from "@modules/users/types";
import { CanAccess } from "@refinedev/core";
import { Create } from "@refinedev/mantine";

const CreateUserPage = () => {
  const { saveButtonProps, register, formState: { errors } } = useCreateUserForm()
 
   //role field
   const { onChange: onRoleChange, ...roleProps } = register("role")

  return (
    <CanAccess resource="users" action="create" fallback={<div>fuck you</div>}>
      <Create title="New User" saveButtonProps={saveButtonProps} contentProps={{ px: 'xl' }}>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { minWidth: 980, cols: 2, spacing: 'md' },
            { maxWidth: 980, cols: 1, spacing: 'md' },
          ]}
        >
          <div>
            <TextInput label='First Name' error={errors['firstName']?.message as string} {...register("firstName")} />
          </div>
          <div>
            <TextInput label='Last Name' error={errors['lastName']?.message as string} {...register("lastName")} />
          </div>
          <div>
            <TextInput label='Email' error={errors['lastName']?.message as string} {...register("email")} />
          </div>
          <div>
            <Select
              label="Role"
              placeholder="Pick one"
              {...roleProps}
              onSelect={onRoleChange}
              error={errors['role']?.message as string}
              data={Object.values(IRole)}
            />
          </div>
          <div>
            <TextInput label='Password' error={errors['password']?.message as string} {...register("password")} />
          </div>
        </SimpleGrid>
      </Create>
    </CanAccess>
  )
}

export default CreateUserPage