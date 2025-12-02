import { SupabaseClient } from "@supabase/supabase-js"
import { ParentWithProfileSchema } from "../_schema/parentEntity"

/** IDに紐づく親を取得する */
export const fetchParent = async ({supabase, userId}: {
  supabase: SupabaseClient,
  userId: string
}) => {

  // データを取得する
  const { data, error } = await supabase.from("parents")
    .select(`
      *,
      profiles!inner (*)
    `)
    .eq("profiles.user_id", userId)

  // エラーをチェックする
  if (error) throw error

  // 先頭のデータを返却する
  return data.length !== 0 ? ParentWithProfileSchema.parse(data[0]) : undefined
}
