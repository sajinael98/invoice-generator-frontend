import { City } from "@modules/customers/types";
import dayjs from "dayjs";
import { z } from "zod";

const item = {
    missionId: z.number().min(1),
    rate: z.number().min(1),
    note: z.string().min(1)
}

const schema = {
    customerId: z.string().min(1),
    invoiceTime: z.date(),
    invoiceDate: z.date(),
    city: z.enum([City.RAMALLAH, City.NABLUS]),
    address: z.string().min(1),
    // items: z.array(z.object(item)).nonempty('items are required'),
}

export const createInvoiceSchema = z.object({
    ...schema
})
