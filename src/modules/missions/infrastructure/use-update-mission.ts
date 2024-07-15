import { zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { UpdateMissionRequest } from "../types";
import { updateMissionSchema } from "./schema";

export function useUpdateMission() {
    return useForm<UpdateMissionRequest>({
        initialValues: {
            id: undefined,
            title: undefined,
            description: undefined,
            rate: undefined
        },
        validate: zodResolver(updateMissionSchema)
    })
}