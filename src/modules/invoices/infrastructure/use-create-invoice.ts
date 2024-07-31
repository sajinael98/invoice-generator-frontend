import { useForm } from "@refinedev/mantine";
import { CreateInvoiceRequest } from "../types";
import { zodResolver } from "@mantine/form";
import { createInvoiceSchema } from "./schema";
import { formatDate, formatTime } from "@utils/date-utils";

export function useCreateInvoice() {
    return useForm<CreateInvoiceRequest>({
        initialValues: {
            customerId: '',
            invoiceTime: '',
            invoiceDate: '',
            city: '',
            address: '',
            items: []
        },
        validate: zodResolver(createInvoiceSchema),
        refineCoreProps:{
            createMutationOptions:{
                onMutate({values}) {
                    if(values.invoiceDate){
                        values.invoiceDate = formatDate(values.invoiceDate)
                    }
                    if(values.invoiceTime){
                    }
                    values.invoiceTime = "02:00 AM"
                },
            }
        }
    })
}