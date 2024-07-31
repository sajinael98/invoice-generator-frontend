import { z } from "zod";

const title = z.string().min(1)
const hourlyRate = z.number().min(1)
const estimatedMins = z.number().min(1)

export const missionSchema = z.object({
    title,
    hourlyRate,
    estimatedMins
})