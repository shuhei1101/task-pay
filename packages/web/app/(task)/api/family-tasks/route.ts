import { NextRequest, NextResponse } from "next/server";
import { handleServerError } from "@/app/(core)/errorHandler";
import { TaskDeleteSchema } from "@/app/(task)/_schema/taskEntity";
import { RegisterTaskRequestSchema, UpdateTaskRequestSchema } from "@/app/(child)/children/api/schema";
import { taskDao } from "../_data-access/taskDao";
import { withAuth } from "@/app/(core)/withAuth";
import { fetchUserBundle } from "@/app/(user)/_query/profileQuery";
import { ServerError } from "@/app/(core)/appError";
import { fetchFamilyTasks } from "../_query/familyTaskQuery";

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
      const task = await fetchFamilyTasks({supabase, familyId})
  
      return NextResponse.json(task)
    } catch (err) {
      return handleServerError(err)
    }
  })
}


/** タスクを登録する */
export async function POST(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const data  = RegisterTaskRequestSchema.parse(body)

    // タスクを登録する
    await taskDao.insert({
      task: {
        name: data.form.name,
        icon: data.form.icon,
        type: "family"
      },
      tags: data.form.tags
    })

    return NextResponse.json({});
  } catch (err) {
    return handleServerError(err)
  }
}

/** タスクを更新する */
export async function PUT(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const data = UpdateTaskRequestSchema.parse(body);

    // タスクを更新する
    await taskDao.update({
      tags: data.form.tags,
      task: {
        icon: data.form.icon,
        type: "family",
        name: data.form.name,
        id: data.task_id,
        updated_at: data.updated_at
      }
    })
    
    // メッセージを返却する
    return NextResponse.json({});
  } catch (err) {
    return handleServerError(err)
  }
}

/** タスクを削除する */
export async function DELETE(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const data = TaskDeleteSchema.parse(body);

    // タスクを削除する
    await taskDao.delete(data)

    return NextResponse.json({});
  } catch (err) {
    return handleServerError(err)
  }
}
