import { z } from "zod"
import { QuestTagEntitySchema } from "../_schema/questTagEntity";
import { SupabaseClient } from "@supabase/supabase-js";
import { QuestEntitySchema } from "../_schema/entity";
import { QuestSearchParams, QuestsGetResponse } from "./quests/schema";

/** 取得結果の型 */
const FetchQuestResult = QuestEntitySchema.extend({
  quest_tags: z.array(QuestTagEntitySchema)
})

/** IDに紐づくクエストを取得する */
export const fetchQuest = async ({id, supabase}: {
  supabase: SupabaseClient,
  id: number
}) => {
  // データを取得する
  const { data, error } = await supabase.from("quests")
      .select(`
        *,
        quest_tags (*)
      `)
      .eq("id", id).single()

    // エラーをチェックする
    if (error) throw error;

    return FetchQuestResult.parse(data)
}


/** 取得結果の型 */
export const FetchQuestsResult = z.array(QuestEntitySchema.extend({
  quest_tags: z.array(QuestTagEntitySchema)
}))

/** 検索条件に一致するクエストを取得する */
export const fetchQuests = async ({
  params,
  supabase,
  familyId,
}: {
  params: QuestSearchParams,
  supabase: SupabaseClient,
  familyId: number
}) => {

  // データを取得する
  let query = supabase.from("quests")
    .select(`
        *,
        quest_tags(*)
      `, { count: 'exact' })

    // フィルター
    if (params.name !== undefined) query = query.ilike("name", `%${params.name}%`)
    if (params.tags.length !== 0) query = query.in("quest_tags.name", params.tags)
    query = query.eq("family_id", familyId) // 家族IDに一致するクエストを取得する
    
    // ソート
    query = query.order(params.sortColumn, {ascending: params.sortOrder === "asc"})
    console.log(`query: ${JSON.stringify(query)}`)
    
    // ページネーション
    query = query.range((params.page-1)*params.pageSize, params.page*params.pageSize-1)
    
    // クエリを実行する
    const { data, error, count } = await query

    if (error) throw error

    const fetchedQuests = FetchQuestsResult.parse(data)

    // 指定タグに完全一致しているクエストを絞り込む
    const questsWithAllTags = fetchedQuests.filter(quest =>
      params.tags.every(tag => quest.quest_tags.some(t => t.name === tag))
    )

    return {
      quests: questsWithAllTags,
      totalRecords: count ?? 0
    } as QuestsGetResponse
}
