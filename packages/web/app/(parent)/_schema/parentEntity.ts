import { ProfileEntitySchema } from "@/app/(user)/_schema/profileEntity"
import { z } from "zod"

/** DBの親スキーマ */
export const ParentEntitySchema = z.object({
  id: z.number(),
  family_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})
export type ParentEntity = z.infer<typeof ParentEntitySchema>

// 更新用
export const ParentInsertSchema = ParentEntitySchema.omit({id: true, created_at: true, updated_at: true})
export const ParentUpdateSchema = ParentEntitySchema.omit({created_at: true})
export const ParentDeleteSchema = ParentEntitySchema.pick({id: true, updated_at: true})
export type ParentInsert = z.infer<typeof ParentInsertSchema>
export type ParentUpdate = z.infer<typeof ParentUpdateSchema>
export type ParentDelete = z.infer<typeof ParentDeleteSchema>

export const ParentWithProfileSchema = ParentEntitySchema.extend({
  profiles: ProfileEntitySchema
})
export type ParentWithProfile = z.infer<typeof ParentWithProfileSchema>
