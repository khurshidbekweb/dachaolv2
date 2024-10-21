"use client"
import { z } from "zod"

export const contactForm = z.object({
    message: z.string().min(5).max(50),
    email: z.string().min(9).max(13, {
        message: 'Telefon raqam +998971234567'
    }),
    name: z.string().min(3)
})
