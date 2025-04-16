import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z. string(),
    phone: z.string().optional(),
    bairro: z.string().optional(),
    provinceId: z.string().optional(), 
    avatarId: z.string().optional()
})


export const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    oldPassword: z. string().optional(),
    newPassword: z. string().optional(),
    phone: z.string().optional(),
    bairro: z.string().optional(),
    provinceId: z.string().optional(), 
    avatarId: z.string().optional()
})