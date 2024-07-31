"use client"

import Create from '@components/Create'
import { CustomerFormProvider, useCustomerForm } from '@modules/customers/infrastructure'
import { CustomerForm } from '@modules/customers/presentation'

const CreateCustomerPage = () => {
  const form = useCustomerForm()

  return (
    <Create saveButtonProps={form.saveButtonProps}>
      <CustomerFormProvider form={form as any}>
        <CustomerForm />
      </CustomerFormProvider>
    </Create>
  )
}

export default CreateCustomerPage