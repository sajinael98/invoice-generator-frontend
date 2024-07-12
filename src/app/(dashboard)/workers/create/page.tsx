"use client"
import { NumberInput, Select, SimpleGrid, TextInput, } from '@mantine/core';
import { DatePicker } from "@mantine/dates";
import { useCreateWorker } from '@modules/workers/infrastructure';
import { useSelect } from '@refinedev/core';
import { Create } from '@refinedev/mantine';

const CreateWorkerPage = () => {
  const { onSearch, options } = useSelect({
    resource: "users",
    onSearch: (value) => [
      {
        field: "firstName",
        operator: "eq",
        value,
      },
    ],
    optionValue(item) {
      return "" + item.id
    },
    optionLabel(item) {
      return item.firstName + " " + item.lastName
    },
    debounce: 500, //2 sec
  });
  const { getInputProps, values, saveButtonProps } = useCreateWorker()

  const user = values?.userId

  return (
    <Create saveButtonProps={saveButtonProps}>
      <SimpleGrid
        breakpoints={[
          { minWidth: 600, cols: 2, spacing: 'sm' },
        ]}
      >
        <div>
          <Select
            label="User"
            placeholder="Select an user"
            data={options}
            onSearchChange={onSearch}
            {...getInputProps("userId")}
            withinPortal
            searchable
          />
        </div>
        <br />
        <div>
          <TextInput
            label="First Name"
            {...getInputProps("firstName")}
            disabled={!(!!user)}
          />
        </div>
        <div>
          <TextInput
            label="Last Name"
            {...getInputProps("lastName")}
            disabled={!(!!user)}
          />
        </div>
        <div>
          <DatePicker
            label="Join Date"
            withinPortal
            inputFormat='YYYY-MM-DD'
            labelFormat='YYYY-MM-DD'
            {...getInputProps("joinDate")} />
        </div>
        <div>
          <NumberInput
            label="Daily Rate"
            {...getInputProps("dailyRate")} />
        </div>
      </SimpleGrid>
    </Create>
  )
}

export default CreateWorkerPage