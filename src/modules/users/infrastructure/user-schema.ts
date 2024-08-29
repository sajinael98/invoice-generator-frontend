import { z } from 'zod';
import { UserRole } from '../types';

export const userSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().min(1, { message: 'Required' }),
    lastName: z.string().min(1, { message: 'Required' }),
    email: z.string().min(1, { message: 'Required' }).email("Invalid email"),
    role: z.enum([UserRole.ADMIN, UserRole.SUPERVISIOR, UserRole.WORKER]),
    password: z.string().optional()
}).refine((data) => {
    const { id, password } = data
    if (id) {
        return true
    }
    if (password !== undefined && (password as string).length < 6) {
        return false
    }
    return true
}, { path: ['password'], message: 'password is required' })