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

export interface CustomerResponse extends ICustomer {
}

export interface CreateCustomerRequest extends Omit<ICustomer, 'id'> {
}

export interface UpdateCustomerRequest {
}