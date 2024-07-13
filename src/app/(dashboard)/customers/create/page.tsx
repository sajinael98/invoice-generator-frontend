"use client"

import { CustomerFormProvider, useCreateCustomer } from '@modules/customers/infrastructure'
import { CustomerForm } from '@modules/customers/presentation'
import { Create } from '@refinedev/mantine'

const CreateCustomerPage = () => {
  const form = useCreateCustomer()

  return (
    <Create saveButtonProps={form.saveButtonProps}>
      <CustomerFormProvider form={form as any}>
        <CustomerForm />
      </CustomerFormProvider>
    </Create>
  )
}

export default CreateCustomerPage