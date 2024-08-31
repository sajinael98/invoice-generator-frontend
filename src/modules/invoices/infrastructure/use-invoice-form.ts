import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { formatDate, parseDate } from "@utils/date-utils";
import { useCallback } from "react";
import { invoiceSchema } from "./schema";

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
        transformValues: useCallback((data: any) => ({ ...data, invoiceDate: formatDate(data.invoiceDate), requiredDate: formatDate(data.requiredDate) }), []),
        refineCoreProps: {
            queryOptions: {
                select: useCallback((data: any) => ({ ...data, data: { ...data.data, invoiceDate: parseDate(data.data.invoiceDate), requiredDate: parseDate(data.data.requiredDate) } }), [])
            }
        },
        validate: zodResolver(invoiceSchema),
    })
}
export const [InvoiceProvider, useInvoiceFormContext] = createFormContext()
