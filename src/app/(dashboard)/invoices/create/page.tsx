"use client"

import { InvoiceProvider, useInvoiceForm } from '@modules/invoices/infrastructure'
import { InvoiceForm } from '@modules/invoices/presentation'
import { Create } from '@refinedev/mantine'

const CreateInvoicePage = () => {
    const form = useInvoiceForm()

    return (
        <Create saveButtonProps={form.saveButtonProps}>
            <InvoiceProvider form={form as any}>
                <InvoiceForm />
            </InvoiceProvider>
        </Create>
    )
}

export default CreateInvoicePage