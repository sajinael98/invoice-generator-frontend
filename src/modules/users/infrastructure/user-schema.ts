import { ZodString, z } from 'zod';
import { IRole } from '../types';

const firstName: ZodString = z.string().min(1, { message: 'Required' })
const lastName: ZodString = z.string().min(1, { message: 'Required' })
const email: ZodString = z.string().min(1, { message: 'Required' }).email("Invalid email")
const role = z.enum([IRole.ADMIN, IRole.USER, IRole.MANAGER])
const password: ZodString = z.string().min(6, { message: 'Required' })

export const createUserSchema = z.object({
    firstName,
    lastName,
    email,
    password,
    role
});

export const updateUserSchema = z.object({
    id: z.number(),
    firstName,
    lastName,
    email,
    role
});