import { NextRequest, NextResponse } from "next/server"
import { handleServerError } from "@/app/(core)/errorHandler"
import { fetchFamilyTask } from "../../_query/familyTaskQuery"
import { fetchUserBundle } from "@/app/(user)/_query/profileQuery"
import { withAuth } from "@/app/(core)/withAuth"
import { ServerError } from "@/app/(core)/appError"

/** タスクを取得する */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  return withAuth(async (supabase, userId) => {
    try {
  
      // 家族IDを取得する
      const {familyId} = await fetchUserBundle({userId, supabase})
      if (!familyId) throw new ServerError("家族IDの取得に失敗しました。")
  
      // パスパラメータからIDを取得する
      const id = params.id
  
      // タスクを取得する
      const task = await fetchFamilyTask({supabase, familyId})
  
      return NextResponse.json(task)
    } catch (err) {
      return handleServerError(err)
    }
  })
}
