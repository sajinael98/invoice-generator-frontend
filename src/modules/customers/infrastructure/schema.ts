import { z } from "zod"
import { City } from "../types"

export const customerSchema = z.object({
    firstName: z.string().min(1, { message: 'Required' }),
    lastName: z.string().min(1, { message: 'Required' }),
    city: z.enum([City.RAMALLAH.toUpperCase(), City.NABLUS.toUpperCase()]),
    address: z.string().min(1, { message: 'Required' }),
    email: z.string().min(1, { message: 'Required' }).email("Invalid email"),
    phone: z.string().regex(/^05\d{8}$/, { message: 'invalid phone' }),
})