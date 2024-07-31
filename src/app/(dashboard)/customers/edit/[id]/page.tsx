"use client"

import Edit from '@components/Edit'
import { CustomerFormProvider, useCustomerForm } from '@modules/customers/infrastructure'
import { CustomerForm } from '@modules/customers/presentation'

const UpdateCustomerPage = () => {
  const form = useCustomerForm()

  return (
    <Edit saveButtonProps={form.saveButtonProps}>
      <CustomerFormProvider form={form as any}>
        <CustomerForm />
      </CustomerFormProvider>
    </Edit>
  )
}

export default UpdateCustomerPage