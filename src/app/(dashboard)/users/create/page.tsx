"use client"

import { Select, SimpleGrid, TextInput } from "@mantine/core";
import { useCreateUserForm } from "@modules/users/infrastructure";
import { IRole } from "@modules/users/types";
import { CanAccess } from "@refinedev/core";
import { Create } from "@refinedev/mantine";

const CreateUserPage = () => {
  const { saveButtonProps, getInputProps } = useCreateUserForm()

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
              data={Object.values(IRole)}
              {...getInputProps("role")}
            />
          </div>
          <div>
            <TextInput
              label='Password'
              {...getInputProps("password")} />
          </div>
        </SimpleGrid>
      </Create>
    </CanAccess>
  )
}

export default CreateUserPage