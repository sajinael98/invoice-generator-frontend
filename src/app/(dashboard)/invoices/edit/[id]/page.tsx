"use client"

import { Button } from '@mantine/core'
import { InvoiceProvider, useInvoiceForm } from '@modules/invoices/infrastructure'
import { InvoiceForm } from '@modules/invoices/presentation'
import { Status } from '@modules/invoices/types'
import { api } from '@providers/data-provider'
import { useNavigation, useNotification, useResourceParams } from '@refinedev/core'
import { Edit } from '@refinedev/mantine'
import { useMutation } from '@tanstack/react-query'

const UpdateInvoicePage = () => {
    const { open } = useNotification()
    const { id: invoiceId } = useResourceParams()
    const { push } = useNavigation()
    const form = useInvoiceForm()
    const status = form.values.status;
    const { isLoading: isConfirming, mutate: confirm } = useMutation({
        mutationFn: (id: any) => api.patch(`/backend-api/invoices/${id}/submit`),
        onSuccess(data, variables, context) {
            open && open({
                type: 'success',
                message: 'Invoice has been submitted successfuly',
            })
            form.refineCore.queryResult?.refetch()
        },
    })

    const { isLoading: isStarting, mutate: start } = useMutation({
        mutationFn: (id: any) => api.patch(`/backend-api/invoices/${id}/start`),
        onSuccess(data, variables, context) {
            push(`/invoices/${invoiceId}/tasks`)
        },

    })

    function confirmHandler() {
        confirm(invoiceId)
    }

    function startHandler() {
        start(invoiceId)
    }

    function continueHandler() {
        push(`/invoices/${invoiceId}/tasks`)
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
                        loading={isConfirming}
                    >
                        Confirm
                    </Button>}
                    {status === Status.CONFIRMED && <Button
                        size='sm'
                        onClick={startHandler}
                        loading={isStarting}
                    >
                        Start
                    </Button>}
                    {[Status.STARTED, Status.IN_PROCESS].includes(status as any) && <Button
                        size='sm'
                        onClick={continueHandler}
                    >
                        Contiune
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