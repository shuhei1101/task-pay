import { UserInfoViewSchema } from "@/app/(user)/schema"
import { z } from "zod"

/** クエスト取得レスポンススキーマ */
export const UsersLoginGetResponseSchema = z.object({
  userInfo: UserInfoViewSchema,
})
export type UsersLoginGetResponse = z.infer<typeof UsersLoginGetResponseSchema>
