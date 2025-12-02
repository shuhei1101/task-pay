import { FamilyCreateFormSchema } from "@/app/(family)/families/new/_schema/familyCreateFormSchema"
import { z } from "zod"

/** 家族作成リクエストスキーマ */
export const FamilyTaskGetRequestSchema = z.object({
  userId: z.string(),
  form: FamilyCreateFormSchema,
})
export type FamilyTaskGetRequest = z.infer<typeof FamilyTaskGetRequestSchema>
