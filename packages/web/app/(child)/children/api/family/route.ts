import { NextRequest, NextResponse } from "next/server";
import { deleteQuest } from "../../../_service/deleteQuest";
import { handleServerError } from "@/app/(core)/errorHandler";
import { RegisterQuestRequest, RegisterQuestRequestSchema, UpdateQuestRequestSchema } from "../schema";
import { questDao } from "@/app/(quest)/api/db";
import { QuestDeleteSchema } from "@/app/(quest)/_schema/entity";


/** タスクを登録する */
export async function POST(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const data  = RegisterQuestRequestSchema.parse(body);

    // タスクを登録する
    await questDao.insert({
      quest: {
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
    const data = UpdateQuestRequestSchema.parse(body);

    // タスクを更新する
    await questDao.update({
      tags: data.form.tags,
      quest: {
        icon: data.form.icon,
        type: "family",
        name: data.form.name,
        id: data.quest_id,
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
    const data = QuestDeleteSchema.parse(body);

    // タスクを削除する
    await questDao.delete(data)

    return NextResponse.json({});
  } catch (err) {
    return handleServerError(err)
  }
}
