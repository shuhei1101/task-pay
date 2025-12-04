"use client"

import { useRouter } from "next/navigation"
import { handleAppError } from "@/app/(core)/errorHandler"
import { questApi } from "../../../_api-client/questApi"
import { appStorage } from "@/app/(core)/_sessionStorage/appStorage"
import { QUESTS_URL } from "@/app/(core)/constants"
import { QuestDelete } from "@/app/(quest)/_schema/entity"

/** 削除ボタン押下時のハンドル */
export const useQuestDelete = () => {
  const router = useRouter()
  const handleDelete = async (quest: QuestDelete) => {
    try {
      // 削除確認を行う
      if (window.confirm('削除します。よろしいですか？')) {

        // タスクを削除する
        await questApi.delete(quest)

        // 前画面で表示するメッセージを登録する
        appStorage.feedbackMessage.set('タスクを削除しました')
          
        // タスク一覧画面に戻る
        router.push(`${QUESTS_URL}`)
      }
    } catch (error) {
      handleAppError(error, router)
    }
  }

  return { handleDelete }
}
