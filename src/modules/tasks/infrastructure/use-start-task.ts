import { api } from "@providers/data-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask, TaskStatus } from "../types";

export const useStartTask = ({ invoiceId: invoiceId }: { invoiceId: any }) => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ taskId }: { taskId: number }) => api.patch(`/backend-api/tasks/${taskId}/start`),
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
                        status: TaskStatus.ACTIVE
                    }
                }
                return task
            }))
        },
    })
}