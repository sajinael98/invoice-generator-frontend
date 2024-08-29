import { api } from "@providers/data-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask, TaskStatus } from "../types";

export const useDoneTask = ({ invoiceId: invoiceId }: { invoiceId: any }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ taskId, counter }: { taskId: number, counter: number }) => api.patch(`/backend-api/tasks/${taskId}/complete`, counter, { headers: { "Content-Type": "application/json" } }),
        onMutate({ taskId }) {
            return {
                taskId
            }
        },
        onSuccess(data, variables, context) {
            queryClient.setQueryData(['invoices', invoiceId, 'tasks'], (prev: ITask[] | undefined) => prev?.map(task => {
                if (context?.taskId === task.id) {
                    return {
                        ...task,
                        status: TaskStatus.COMPLETED
                    }
                }
                return task
            }))
        },
    })
}