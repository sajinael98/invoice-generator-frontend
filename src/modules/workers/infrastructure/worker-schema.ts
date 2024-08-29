import { formatDate, parseDate } from "@utils/date-utils";
import { z } from "zod";

export const workerSchema = z.object({
    userId: z.number({ message: "user is required." }),
    joinedDate: z.date({ message: "joined data is required." }),
    dailyRate: z.number().min(1, { message: "daily rate is required." })
})