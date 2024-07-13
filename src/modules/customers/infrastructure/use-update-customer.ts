import { zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { UpdateCustomerRequest } from "../types";
import { updateCustomerSchema } from "./schema";

export function useUpdateCustomer() {
    return useForm<UpdateCustomerRequest>({
        initialValues: {
            id: undefined,
            firstName: undefined,
            lastName: undefined,
            city: undefined,
            address: undefined,
            email: undefined,
            phone: undefined
        },
        validate: zodResolver(updateCustomerSchema),
    })
}