import { QuestDeleteSchema, QuestEntitySchema, QuestUpdateSchema } from "@/app/(quest)/_schema/entity"
import { QuestTagEntitySchema, QuestTagUpdateSchema } from "@/app/(quest)/_schema/questTagEntity"
import { z } from "zod"

/** タスク取得レスポンススキーマ */
export const QuestGetResponseSchema = z.object({
  quest: QuestEntitySchema.extend({
    quest_tags: z.array(QuestTagEntitySchema)
  })
})
export type QuestGetResponse = z.infer<typeof QuestGetResponseSchema>

/** タスク更新リクエストスキーマ */
export const QuestPutRequestSchema = z.object({
  quest: QuestUpdateSchema,
  tags: z.array(QuestTagUpdateSchema)
})
export type QuestPutRequest = z.infer<typeof QuestPutRequestSchema>

/** タスク削除リクエストスキーマ */
export const QuestDeleteRequestSchema = z.object({
  quest: QuestDeleteSchema,
})
export type QuestDeleteRequest = z.infer<typeof QuestDeleteRequestSchema>
