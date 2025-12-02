import { clientSupabase } from "@/app/(core)/_supabase/clientSupabase"
import { ProfileEntitySchema, UserBundleSchema } from "../_schema/profileEntity"
import { SupabaseClient } from "@supabase/supabase-js"


/** UserIdに紐づくユーザを取得する */
export const fetchProfile = async (userId?: string) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("profiles")
      .select('*')
      .eq("user_id", userId)
      .single()

    // エラーをチェックする
    if (error) throw error

    if (!data || data.length === 0) {
      return undefined
    }

    return ProfileEntitySchema.parse(data)
}

/** ユーザIDに紐づく自身の家族情報を取得する */
export const fetchUserBundle = async ({userId, supabase}: {
  userId: string,
  supabase: SupabaseClient
}) => {
  // データを取得する
  const { data, error } = await supabase.from("profiles")
    .select(`
      *,
      parents!inner (
        *,
        families!inner(id)
      ),  
      children!inner (
          *,
        families!inner(id)
      ),
    `)
    .eq("user_id", userId)

  // エラーをチェックする
  if (error) throw error;

  // データが無い場合
  if (data.length !== 0) return {}
  
  const userBundle = UserBundleSchema.parse(data[0])
  const existChild = userBundle.children.length !== 0
  const existParent = userBundle.parents.length !== 0

  let familyId: number | undefined = undefined
  if (existChild) {
    familyId = userBundle.children[0].family_id
  } else if (existParent) {
    familyId = userBundle.parents[0].family_id
  }

  return {
    user: userBundle,
    familyId: familyId
  }
}
