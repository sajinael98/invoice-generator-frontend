import { z } from "zod";

export const missionSchema = z.object({
    title: z.string().min(1),
    hourlyRate: z.number().min(1),
    estimatedMins: z.number().min(1),
})