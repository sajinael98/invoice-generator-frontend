import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { formatDate, parseDate } from "@utils/date-utils";
import { useCallback } from "react";
import { invoiceSchema } from "./schema";

function transformValues(values: any) {
    values.invoiceDate = formatDate(values.invoiceDate)
    values.requiredDate = formatDate(values.requiredDate)
}

export function useInvoiceForm() {
    return useForm({
        initialValues: {
            id: undefined,
            customerId: undefined,
            phone: undefined,
            email: undefined,
            invoiceDate: undefined,
            requiredDate: undefined,
            requiredTime: undefined,
            city: undefined,
            address: undefined,
            status: undefined,
            items: []
        },
        refineCoreProps: {
            createMutationOptions: {
                onMutate({ values }) {
                    transformValues(values)
                },
            },
            updateMutationOptions: {
                onMutate({ values }: any) {
                    transformValues(values)
                },
            } as any,
            queryOptions: {
                select: useCallback((data: any) => {
                    data.data.invoiceDate = parseDate(data.data.invoiceDate)
                    data.data.requiredDate = parseDate(data.data.requiredDate)
                    return data
                }, [])
            }
        },
        validate: zodResolver(invoiceSchema),

    })
}
export const [InvoiceProvider, useInvoiceFormContext] = createFormContext()
