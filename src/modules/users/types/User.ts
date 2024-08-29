import { UserRole } from "./UserRole"

export interface IUser {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}