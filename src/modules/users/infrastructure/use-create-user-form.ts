import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "./user-schema";
import { ICreateUserRequest } from "../types";
import { useForm } from "@refinedev/mantine";

export function useCreateUserForm() {
    const form = useForm<ICreateUserRequest>({
        // resolver: zodResolver(createUserSchema),
        refineCoreProps: {
            // errorNotification(error, _values, _resource) {
            //     const err = error?.response?.data
            //     if (typeof err === "object") {
            //         Object.keys(err).forEach(fieldError => {
            //             form.setError(fieldError, { message: err[fieldError] })
            //         })
            //         return {
            //             message: `Something went wrong when creating `,
            //             description: error?.response?.statusText,
            //             type: "error",
            //         };
            //     }
            //     return {
            //         message: `Something went wrong when creating `,
            //         description: err,
            //         type: "error",
            //     };

            // },
        },
    })
    return form
}