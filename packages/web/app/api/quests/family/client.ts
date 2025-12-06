import queryString from "query-string"
import { handleAPIError } from "@/app/(core)/errorHandler";
import { FAMILY_QUESTS_API_URL } from "@/app/(core)/constants";
import { FamilyQuestSearchParams, QuestsFamilyGetResponseSchema, PostFamilyQuestRequest, PostFamilyQuestResponseSchema } from "./schema";
import { devLog } from "@/app/(core)/util";

/** 家族クエストをGETする */
export const getFamilyQuests = async (params: FamilyQuestSearchParams) => {

  // クエリストリングを生成する
  const qs = queryString.stringify(params, { arrayFormat: "none" })
  
  // APIを実行する
  const res = await fetch(`${FAMILY_QUESTS_API_URL}?${qs}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  // ステータスが不正な場合、アプリ例外を発生させる
  if (!res.ok) {
    await handleAPIError(res)
  }
  const data = await res.json()

  devLog("getFamilyQuestsの戻り値: ", data)

  return QuestsFamilyGetResponseSchema.parse(data)
}

/** 家族クエストをPOSTする */
export const postFamilyQuest = async (request: PostFamilyQuestRequest) => {
  // APIを実行する
  const res = await fetch(`${FAMILY_QUESTS_API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  })

  // ステータスが不正な場合、アプリ例外を発生させる
  if (!res.ok) {
    await handleAPIError(res)
  }

  const data = await res.json()

  devLog("postFamilyQuestの戻り値: ", data)

  return PostFamilyQuestResponseSchema.parse(data)
}
