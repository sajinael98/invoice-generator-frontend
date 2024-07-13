"use client"

import { CustomerFormProvider, useUpdateCustomer } from '@modules/customers/infrastructure'
import { CustomerForm } from '@modules/customers/presentation'
import { Edit } from '@refinedev/mantine'
import { useEffect } from 'react'

const UpdateCustomerPage = () => {
  const form = useUpdateCustomer()
  
  useEffect(() => {
    form.getInputProps('id')
  }, [])

  return (
    <Edit saveButtonProps={form.saveButtonProps}>
      <CustomerFormProvider form={form as any}>
        <CustomerForm />
      </CustomerFormProvider>
    </Edit>
  )
}

export default UpdateCustomerPage