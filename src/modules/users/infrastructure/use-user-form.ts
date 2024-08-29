import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { userSchema } from "./user-schema";

export function useUserForm() {
    return useForm({
        initialValues: {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            password: ''
        },
        validate: zodResolver(userSchema),
    })
}

export const [UserProvider, useUserFormContext] = createFormContext()
