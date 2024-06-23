import { z } from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Required"),
  newPassword: z.string().min(6, "Min. 6 characters"),
  confirmNewPassword: z.string().min(1, "Required"),
});

export type ChangePasswordInputType = z.infer<typeof ChangePasswordSchema>;
