import { zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { CreateCustomerRequest } from "../types";
import { createCustomerSchema } from "./schema";

export function useCreateCustomer() {
    return useForm<CreateCustomerRequest>({
        validate: zodResolver(createCustomerSchema),
    })
}