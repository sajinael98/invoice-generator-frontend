import { useForm, } from "@refinedev/react-hook-form";
import { IUpdateUserRequest } from "../types";
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from "./user-schema";

export function useUpdateUserForm() {
    const form = useForm<IUpdateUserRequest>({
        resolver: zodResolver(updateUserSchema),
        refineCoreProps: {
            onMutationError(error, variables, context, isAutoSave) {
                
            },
            errorNotification(error, _values, _resource) {
                const err = error?.response?.data
                console.log(">>>")
                if (typeof err === "object") {
                    Object.keys(err).forEach(fieldError => {
                        form.setError(fieldError, { message: err[fieldError] })
                    })
                    return {
                        message: `Something went wrong when creating `,
                        description: error?.response?.statusText,
                        type: "error",
                    };
                }
                return {
                    message: `Something went wrong when creating `,
                    description: err,
                    type: "error",
                };

            },
        },
    })

    return form
}