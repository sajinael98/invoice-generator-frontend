import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { customerSchema } from "./schema";

export function useCustomerForm() {
    return useForm({
        initialValues: {
            id: "",
            firstName: "",
            lastName: "",
            city: "",
            address: "",
            phone: "",
            email: ""
        },
        validate: zodResolver(customerSchema)
    })
}

export const [CustomerFormProvider, useCustomerFormContext] = createFormContext()