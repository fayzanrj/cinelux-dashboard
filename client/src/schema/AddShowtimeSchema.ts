import { z } from "zod";

export const AddShowtimeSchema = z.object({
    time: z.string().min(1, "Time is required"),
    date: z.string().min(1, "Date is required"),
});

export type AddShowtimeInputType = z.infer<typeof AddShowtimeSchema>;
