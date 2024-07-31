import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { customerSchema } from "./schema";

export function useCustomerForm() {
    return useForm({
        initialValues: {
            id: undefined,
            firstName: undefined,
            lastName: undefined,
            city: undefined,
            address: undefined,
            phone: undefined,
            email: undefined
        },
        validate: zodResolver(customerSchema)
    })
}

export const [CustomerFormProvider, useCustomerFormContext] = createFormContext()