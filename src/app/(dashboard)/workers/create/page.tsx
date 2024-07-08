"use client"
import { NumberInput, Select, SimpleGrid, TextInput, } from '@mantine/core';
import { DatePicker } from "@mantine/dates";
import { Create, useForm, useSelect } from '@refinedev/mantine';

import dayjs from 'dayjs';
const CreateWorkerPage = () => {
  const { selectProps } = useSelect({
    resource: "users",
    onSearch: (value) => [
      {
        field: "firstName",
        operator: "eq",
        value,
      },
    ],
    optionValue(item) {
      return "1"
    },
    optionLabel(item) {
      return item.firstName + " " + item.lastName
    },
    debounce: 1000, //2 sec
  });
  const { getInputProps, values, saveButtonProps } = useForm({
    transformValues(values) {
      values['joinDate'] = dayjs(values?.joinDate).format("YYYY-MM-DD")
      return values
    },
  })

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
            {...getInputProps("userId")}
            {...selectProps}
            // onChange={(e) => {
            //   setValue("userId", e)
            // }}
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
          <DatePicker label="Join Date" withinPortal inputFormat='YYYY-MM-DD' labelFormat='YYYY-MM-DD' {...getInputProps("joinDate")} />
        </div>
        <div>
          <NumberInput label="Daily Rate" {...getInputProps("dailyRate")} />
        </div>
      </SimpleGrid>

    </Create>
  )
}

export default CreateWorkerPage