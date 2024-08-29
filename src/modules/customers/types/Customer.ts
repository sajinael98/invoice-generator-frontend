import { City } from "./City";

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: City
    email: string;
    phone: string;
}