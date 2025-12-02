import { NextRequest, NextResponse } from "next/server"
import { handleServerError } from "@/app/(core)/errorHandler"
import { fetchFamilyTask } from "../../_query/familyTaskQuery"
import { createClient } from "@/app/(core)/_supabase/server"

/** タスクを取得する */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    // supabaseクライアントを取得する
    const supabase = await createClient()

    // ユーザIDを取得する
    const {data: { user }} = await supabase.auth.getUser()
    const userId = user?.id

    // 家族IDを取得する
    

    // パスパラメータからIDを取得する
    const id = params.id
    
    // bodyを展開する
    const body = await request.json()
    const data  = RegisterTaskRequestSchema.parse(body)

    // タスクを取得する
    const task = await fetchFamilyTask(id)

    return NextResponse.json(task)
  } catch (err) {
    return handleServerError(err)
  }
}
