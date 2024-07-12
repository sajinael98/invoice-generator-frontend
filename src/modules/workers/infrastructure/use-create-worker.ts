import { useForm } from "@refinedev/mantine";
import { WorkerCreateRequest } from "../types";
import dayjs from "dayjs";
import { createFormContext } from '@mantine/form';
import { UseForm } from "@mantine/form/lib/types";

export function useCreateWorker() {
    return useForm<WorkerCreateRequest>({
        transformValues(values) {
            values['joinDate'] = dayjs(values?.joinDate as Date).format("YYYY-MM-DD")
            return values
        },
    })
}