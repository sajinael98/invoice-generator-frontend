import { createFormContext, zodResolver } from "@mantine/form";
import { useForm } from "@refinedev/mantine";
import { missionSchema } from "./schema";

export function useMissionForm() {
    return useForm({
        initialValues: {
            id: 0,
            title: '',
            hourlyRate: 0,
            estimatedMins: 0,
            description: ''
        },
        validate: zodResolver(missionSchema)
    })
}

export const [MissionProvider, useMissionFormContext] = createFormContext()