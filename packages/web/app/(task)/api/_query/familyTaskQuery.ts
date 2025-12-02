import { z } from "zod"
import { TaskColumns, TaskEntitySchema } from "../../_schema/taskEntity";
import { SortOrder } from "@/app/(core)/appSchema";
import { clientSupabase } from "@/app/(core)/_supabase/clientSupabase";
import { TaskFilterType } from "../../tasks/_schema/taskFilterSchema";
import { TaskTagEntitySchema } from "../../_schema/taskTagEntity";
import { SupabaseClient } from "@supabase/supabase-js";

/** 取得結果の型 */
const FetchFamilyTasksResult = z.array(TaskEntitySchema.extend({
  task_tags: z.array(TaskTagEntitySchema)
}))

/** 検索条件に一致するタスクを取得する */
export const fetchFamilyTasks = async ({
  sortColumn,
  sortOrder,
  filter,
  page,
  pageSize
}: {
  sortColumn: TaskColumns,
  sortOrder: SortOrder,
  filter: TaskFilterType,
  page: number,
  pageSize: number
}) => {
    // データを取得する
    let query = clientSupabase.from("tasks")
      .select(`
          *,
          task_tags(*)
        `, { count: 'exact' })

    // フィルター
    if (filter.name !== undefined) query = query.ilike("name", `%${filter.name}%`)
    if (filter.tags.length !== 0) query = query.in("task_tags.name", filter.tags)
    
    console.log(`tags: ${JSON.stringify(filter.tags)}`)

    // ソート
    query = query.order(sortColumn, {ascending: sortOrder === "asc"})
    console.log(`query: ${JSON.stringify(query)}`)
    
    // ページネーション
    query = query.range((page-1)*pageSize, page*pageSize-1)
    
    // クエリを実行する
    const { data, error, count } = await query

    if (error) throw error

    const fetchedTasks = FetchFamilyTasksResult.parse(data)

    // 指定タグに完全一致しているタスクを絞り込む
    const tasksWithAllTags = fetchedTasks.filter(task =>
      filter.tags.every(tag => task.task_tags.some(t => t.name === tag))
    )

    console.log(`data${JSON.stringify(data)}`)

    return {
      tasks: tasksWithAllTags,
      totalRecords: count
    }
}

/** 取得結果の型 */
const FetchFamilyTaskResult = TaskEntitySchema.extend({
  task_tags: z.array(TaskTagEntitySchema)
})

/** IDに紐づくタスクを取得する */
export const fetchFamilyTask = async ({}: {
  supabase: SupabaseClient,
  familyId: number
}) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("tasks")
      .select(`
        *,
        task_tags (*)
      `)
      .eq("id", id).single()

    // エラーをチェックする
    if (error) throw error;

    return FetchFamilyTaskResult.parse(data)
}
