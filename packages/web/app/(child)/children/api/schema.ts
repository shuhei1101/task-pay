import { QuestFormSchema } from "@/app/(quest)/quests/[id]/schema"
import { z } from "zod"

/** クエスト登録リクエストスキーマ */
export const RegisterQuestRequestSchema = z.object({
  user_id: z.string(),
  form: QuestFormSchema,
})
export type RegisterQuestRequest = z.infer<typeof RegisterQuestRequestSchema>

/** クエスト削除リクエストスキーマ */
export const DeleteQuestRequestSchema = z.object({
  updated_at: z.string(),
})
export type DeleteQuestRequest = z.infer<typeof DeleteQuestRequestSchema>
