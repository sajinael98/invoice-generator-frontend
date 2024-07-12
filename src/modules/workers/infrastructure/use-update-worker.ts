import { useForm } from "@refinedev/mantine";
import { WorkerUpdateRequest } from "../types";
import dayjs from "dayjs";

export function useUpdateWorker() {
    return useForm<WorkerUpdateRequest>({
        initialValues: {
            id: undefined,
            userId: undefined,
            firstName: undefined,
            lastName: undefined,
            joinDate: undefined,
            dailyRate: undefined
        },
        transformValues(values) {
            values['joinDate'] = dayjs(values?.joinDate as Date).format("YYYY-MM-DD")
            return values
        },
        refineCoreProps: {
            queryOptions: {
                select(data) {
                    if (typeof data.data['joinDate'] === "object") {
                        return data
                    }
                    data.data['joinDate'] = dayjs(data.data['joinDate']).toDate() as any
                    return data
                },
            }
        }
    })
}