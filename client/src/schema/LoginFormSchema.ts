import { z } from "zod";

export const logInFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LogInInputType = z.infer<typeof logInFormSchema>;
