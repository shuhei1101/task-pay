import { createClient } from "../../_supabase/client"
import { IconEntitySchema, IconEntityWithCategoriesSchema } from "../_schema/iconSchema"

/** 全てのアイコンを取得する */
export const fetchIcons = async () => {
  // データを取得する
  const { data, error } = await createClient().from("icons")
      .select(`
        *,
        icon_categories (*)
      `)

    // エラーをチェックする
    if (error) throw error

    return IconEntityWithCategoriesSchema.array().parse(data)
}

/** IDに紐づくアイコンを取得する */
export const fetchIcon = async (id: number) => {
  // データを取得する
  const { data, error } = await createClient().from("icons")
      .select('*')
      .eq("id", id).single()

    // エラーをチェックする
    if (error) throw error

    return IconEntitySchema.parse(data)
}
