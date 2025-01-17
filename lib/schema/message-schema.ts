import * as z from "zod"

export const messageSchema = z.object({
  message: z.string().optional(),
  roomId: z.string().min(1, "Room ID is required"),
})

export type MessageFormValues = z.infer<typeof messageSchema>
