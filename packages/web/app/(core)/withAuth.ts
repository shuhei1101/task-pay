import { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "./_supabase/server"
import { AuthorizedError } from "./appError"

/** Supabaseと認証済みuserIdを返す関数ラッパー */
export async function withAuth<T>(
  callback: (supabase: SupabaseClient, userId: string) => Promise<T>
): Promise<T> {

  // supabaseクライアントを生成する
  const supabase = await createClient()

  // ユーザIDを取得する
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  const userId = user?.id
  if (!userId) throw new AuthorizedError

  // supabaseとuserIdを渡して関数を実行する
  return callback(supabase, userId)
}
