"use client"
import { z } from "zod"

export const contactForm = z.object({
    message: z.string().min(5).max(50),
    email: z.string().email(),
    name: z.string().min(3)
})
