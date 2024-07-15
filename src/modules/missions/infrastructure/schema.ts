import { z } from "zod";

const id = z.number().min(1)
const title = z.string().min(1)
const description = z.string().min(1)
const rate = z.number().min(1)

export const createMissionSchema = z.object({
    title,
    description,
    rate
})

export const updateMissionSchema = z.object({
    id,
    title,
    description,
    rate
})

