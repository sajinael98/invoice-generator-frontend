"use client"

import { Button, Notification } from '@mantine/core'
import { InvoiceProvider, useInvoiceForm } from '@modules/invoices/infrastructure'
import { InvoiceForm } from '@modules/invoices/presentation'
import { Status } from '@modules/invoices/types'
import { api } from '@providers/data-provider'
import { useNotification } from '@refinedev/core'
import { Edit } from '@refinedev/mantine'
import { useIsMutating, useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

const UpdateInvoicePage = () => {
    const { open } = useNotification()
    const form = useInvoiceForm()
    const status = form.values.status;
    const { isLoading, mutate } = useMutation({
        mutationFn: (id: any) => api.patch(`/backend-api/invoices/${id}/submit`),
        onSuccess(data, variables, context) {
            open && open({
                type: 'success',
                message: 'Invoice has been submitted successfuly',
            })
            form.refineCore.queryResult?.refetch()

        },
    })

    function confirmHandler() {
        mutate(form.values.id)
    }
    const footerButtonProps = status === Status.CONFIRMED ? {
        display: 'none'
    } : undefined

    const contentProps = status !== Status.PENDING ? {
        sx: {
            pointerEvents: 'none'
        }
    } : undefined

    return (
        <Edit
            contentProps={contentProps as any}
            footerButtonProps={footerButtonProps}
            saveButtonProps={form.saveButtonProps}
            headerButtons={({ defaultButtons }) =>
                <>
                    {defaultButtons}
                    {status === Status.PENDING && <Button
                        size='sm'
                        onClick={confirmHandler}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>}

                </>
            }>
            <InvoiceProvider form={form as any}>
                <InvoiceForm />
            </InvoiceProvider>
        </Edit>
    )
}

export default UpdateInvoicePage