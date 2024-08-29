import { api } from "@providers/data-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAssignTaskWorker = ({ taskId, invoiceId }: { taskId: number, invoiceId: number }) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ workerId }: { workerId: number }) => api.patch(`/backend-api/tasks/${taskId}/assignments`, workerId, { headers: { 'Content-Type': 'application/json' } }),
        onMutate(variables) {
            return {
                workerId: variables.workerId
            }
        },
        onSuccess(_data, _variables, context) {
            queryClient.setQueryData(['invoices', invoiceId, 'tasks'], (old: any) => {
                return old.map((task: any) => task.id === taskId ? ({ ...task, workerId: context?.workerId }) : task)
            })
        },
    })
}