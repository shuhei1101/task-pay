import { z } from "zod"
const SortOrderArray = ['asc', 'desc'] as const
export const SortOrderSchema = z.enum(SortOrderArray)
export type SortOrder = z.infer<typeof SortOrderSchema>
