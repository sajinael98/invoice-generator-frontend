import { City } from "@modules/customers/types";
import dayjs from "dayjs";
import { z } from "zod";

const item = {
    missionId: z.number().min(1),
    hourlyRate: z.number().min(1),
}

export const invoiceSchema = z.object({
    customerId: z.number().min(1, 'required'),
    phone: z.string().min(1, { message: 'required' }),
    email: z.string().min(1, 'required'),
    invoiceDate: z.date({ message: 'required' }),
    requiredDate: z.date({ message: 'required' }),
    requiredTime: z.string({ message: 'required' }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'required' }),
    city: z.enum([City.RAMALLAH, City.NABLUS], { message: 'required' }),
    address: z.string().min(1),
    items: z.array(z.object(item)).nonempty('items are required'),
})
