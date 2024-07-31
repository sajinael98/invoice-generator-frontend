import { Status } from "./Status";

export interface IItem {
    id: number;
    note: string;
    hourlyRate: number;
    missionId: number;
    missionTitle: string;
    estimatedMins: number;
    taskId: number;
}

interface IInvoice {
    id: number;
    invoiceDate: string;
    invoiceTime: string;
    address: string;
    city: string;
    total: number;
    status: Status
    customerId: number;
    customerName: string;
    items: IItem[]
}

interface InvoiceRequest extends IInvoice {
}

export interface CreateInvoiceRequest extends Omit<InvoiceRequest, 'id'> { }

export interface UpdateInvoiceRequest extends InvoiceRequest { }

export interface InvoiceResponse extends IInvoice { }