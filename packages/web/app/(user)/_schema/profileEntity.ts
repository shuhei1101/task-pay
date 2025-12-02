import { ChildEntitySchema } from "@/app/(child)/_schema/childEntity"
import { FamilyEntitySchema } from "@/app/(family)/_schema/familyEntity"
import { ParentEntitySchema } from "@/app/(parent)/_schema/parentEntity"
import { z } from "zod"

/** DBのユーザスキーマ */
export const ProfileEntitySchema = z.object({
  user_id: z.string(),
  name: z.string(),
  icon: z.string(),
  birthday: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})
export type ProfileEntity = z.infer<typeof ProfileEntitySchema>

// 更新用
export const ProfileInsertSchema = ProfileEntitySchema.omit({created_at: true, updated_at: true})
export const ProfileUpdateSchema = ProfileEntitySchema.omit({created_at: true})
export const ProfileDeleteSchema = ProfileEntitySchema.pick({user_id: true, updated_at: true})
export type ProfileInsert = z.infer<typeof ProfileInsertSchema>
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>
export type ProfileDelete = z.infer<typeof ProfileDeleteSchema>

// ユーザカラム名の型
export type ProfileColumns = keyof ProfileEntity

// 値オブジェクト
export const UserName = z.string().nonempty({error: "氏名は必須です。"})
export const Birthday = z.string().nonempty({error: "誕生日は必須です。"}).refine((val) => !isNaN(Date.parse(val)), {
  message: "有効な日付文字列ではありません",
})

export const UserBundleSchema = ProfileEntitySchema.extend({
  parents: z.array(ParentEntitySchema.extend({
    families: z.array(FamilyEntitySchema)
  })),
  children: z.array(ChildEntitySchema.extend({
    families: z.array(FamilyEntitySchema)
  })),
})
export type UserBundle = z.infer<typeof UserBundleSchema>
