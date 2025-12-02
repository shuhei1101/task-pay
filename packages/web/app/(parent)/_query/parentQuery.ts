import { SupabaseClient } from "@supabase/supabase-js"
import { ParentEntitySchema } from "../_schema/parentEntity"

/** IDに紐づく親を取得する */
export const fetchParent = async ({supabase, userId}: {
  supabase: SupabaseClient,
  userId: string
}) => {
  // データを取得する
  const { data, error } = await supabase.from("parents")
    .select(`
      *,
      
    `)
    .eq("user_id", userId)

  // エラーをチェックする
  if (error) throw error

  return data.length !== 0 ? ParentEntitySchema.parse(data[0]) : undefined
}
