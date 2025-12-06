import { createClient } from "../../_supabase/client"
import { IconCategoryEntitySchema } from "../_schema/iconCategorySchema"

/** 全てのアイコンカテゴリを取得する */
export const fetchIconCategories = async () => {
  // データを取得する
  const { data, error } = await createClient().from("icon_categories")
      .select(`*`)

    // エラーをチェックする
    if (error) throw error

    return IconCategoryEntitySchema.array().parse(data)
}

/** IDに紐づくアイコンを取得する */
export const fetchIconCategory = async (id: number) => {
  // データを取得する
  const { data, error } = await createClient().from("icon_categories")
      .select('*')
      .eq("id", id).single()

    // エラーをチェックする
    if (error) throw error

    return IconCategoryEntitySchema.parse(data)
}
