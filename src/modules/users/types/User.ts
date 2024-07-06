import { IRole } from "./Role"

export interface IUser {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    role: IRole;
}

export interface ICreateUserRequest extends Omit<IUser, 'id'> {
    password: string
}

export interface IUpdateUserRequest extends IUser {}

