"use client"

import { InvoiceProvider, useInvoiceForm } from '@modules/invoices/infrastructure'
import { InvoiceForm } from '@modules/invoices/presentation'
import { Edit } from '@refinedev/mantine'

const UpdateInvoicePage = () => {
    const form = useInvoiceForm()

    return (
        <Edit saveButtonProps={form.saveButtonProps}>
            <InvoiceProvider form={form as any}>
                <InvoiceForm />
            </InvoiceProvider>
        </Edit>
    )
}

export default UpdateInvoicePage