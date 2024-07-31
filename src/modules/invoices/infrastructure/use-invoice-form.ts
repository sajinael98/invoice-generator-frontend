import { createFormContext } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { formatDate, parseDate } from "@utils/date-utils";
import { useCallback } from "react";

export function useInvoiceForm() {
    return useForm({
        initialValues: {
            id: '',
            customerId: '',
            phone: '',
            email: '',
            invoiceDate: '',
            requiredDate: '',
            requiredTime: '',
            city: '',
            address: '',
            items: []
        },
        refineCoreProps: {
            createMutationOptions: {
                onMutate({ values }) {
                    values.invoiceDate = formatDate(values.invoiceDate)
                    values.requiredDate = formatDate(values.requiredDate)
                },
            },
            updateMutationOptions: {
                onMutate({ values }) {
                    values.invoiceDate = formatDate(values.invoiceDate)
                    values.requiredDate = formatDate(values.requiredDate)
                },
            },
            queryOptions: {
                select: useCallback((data: any) => {
                    data.data.invoiceDate = parseDate(data.data.invoiceDate)
                    data.data.requiredDate = parseDate(data.data.requiredDate)
                    return data
                }, [])
            }
        }
    })
}
export const [InvoiceProvider, useInvoiceFormContext] = createFormContext()
