import { useForm, } from "@refinedev/react-hook-form";
import { WorkerCreateRequest } from "../types";

export function useCreateWorker(){
    return useForm<WorkerCreateRequest>()
}