import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title cannot exceed 50 characters"),
  description: z
    .string()
    .max(200, "Description cannot exceed 500 characters")
    .optional(),
});

export const taskDefaultValues = {
  id: "",
  title: "",
  description: "",
};
