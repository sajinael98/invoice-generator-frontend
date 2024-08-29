import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { workerSchema } from "./worker-schema";
import { formatDate, parseDate } from "@utils/date-utils";
import { useCallback } from "react";

export function useWorkerForm() {
    return useForm({
        initialValues: {
            id: 0,
            userId: '',
            firstName: '',
            lastName: '',
            joinedDate: '',
            dailyRate: 0
        },
        validate: zodResolver(workerSchema),
        transformValues: useCallback((data: any) => ({ ...data, joinedDate: formatDate(data.joinedDate) }), []),
        refineCoreProps: {
            queryOptions: {
                select: useCallback((data: any) => ({ ...data, data: { ...data.data, joinedDate: parseDate(data.joinDate) } }), [])
            }
        }
    })
}

export const [WorkerFormProvider, useWorkerFormContext] = createFormContext()