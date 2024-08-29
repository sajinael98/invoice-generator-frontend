import { api } from "@providers/data-provider";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetWorkersWithoutTasks = <T = any>(options: UseQueryOptions<T> = {}) => useQuery({
    queryKey: ['workers', 'without', 'tasks'],
    queryFn: ({ signal }) => api.get("/backend-api/workers/without-tasks", { signal }),
    ...options
})