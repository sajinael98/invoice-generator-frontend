import { useForm } from "@refinedev/mantine";
import { CreateMissionRequest } from "../types";
import { zodResolver } from "@mantine/form";
import { createMissionSchema } from "./schema";

export function useCreateMission() {
    return useForm<CreateMissionRequest>({
        validate: zodResolver(createMissionSchema)
    })
}