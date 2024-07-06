import { ZodString, z } from 'zod';

const firstName: ZodString = z.string().min(1, { message: 'Required' })
const lastName: ZodString = z.string().min(1, { message: 'Required' })
const email: ZodString = z.string().min(1, { message: 'Required' }).email("Invalid email")

const password: ZodString = z.string().min(6, { message: 'Required' })

export const createUserSchema = z.object({
    firstName,
    lastName,
    email,
    password
});

export const updateUserSchema = z.object({
    firstName,
    lastName,
    email,
});