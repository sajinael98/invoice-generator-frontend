import { ZodString, z } from "zod"
import { City } from "../types"

const firstName: ZodString = z.string().min(1, { message: 'Required' })
const lastName: ZodString = z.string().min(1, { message: 'Required' })
const city = z.enum([City.RAMALLAH.toUpperCase(), City.NABLUS.toUpperCase()])
const address: ZodString = z.string().min(1, { message: 'Required' })
const email: ZodString = z.string().min(1, { message: 'Required' }).email("Invalid email")
const phone: ZodString = z.string().regex(/^05\d{8}$/, { message: 'invalid phone' })

export const createCustomerSchema = z.object({
    firstName,
    lastName,
    email,
    city,
    address,
    phone
})

export const updateCustomerSchema = z.object({
    firstName,
    lastName,
    email,
    city,
    address,
    phone
})