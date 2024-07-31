import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { missionSchema } from "./schema";

export function useMissionForm() {
    return useForm({
        initialValues: {
            id: undefined,
            title: undefined,
            hourlyRate: 0,
            estimatedMins: 0,
            description: undefined
        },
        validate: zodResolver(missionSchema)
    })
}

export const [MissionProvider, useMissionFormContext] = createFormContext()