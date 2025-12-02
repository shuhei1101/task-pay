import { handleAPIError } from "@/app/(core)/errorHandler";
import { FAMILY_TASK_API_URL } from "@/app/(core)/appConstants";
import { TaskDelete } from "../_schema/taskEntity";
import { RegisterTaskRequest, UpdateTaskRequest } from "@/app/(child)/children/api/schema";
import { useLoginUserInfo } from "@/app/(auth)/_hooks/useLoginUserInfo";

export const taskApi = {
  /** タスクを取得する */
  get: async (request: RegisterTaskRequest) => {
    /** ログインユーザ情報を取得する */
    const { session } = useLoginUserInfo()

    // APIを実行する
    const res = await fetch(`${FAMILY_TASK_API_URL}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(request)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
  
  /** タスクを作成する */
  create: async (request: RegisterTaskRequest) => {

    /** ログインユーザ情報を取得する */
    const { session } = useLoginUserInfo()

    // APIを実行する
    const res = await fetch(`${FAMILY_TASK_API_URL}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(request)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
  
  /** タスクを更新する */
  update: async (request: UpdateTaskRequest) => {

    /** ログインユーザ情報を取得する */
    const { session } = useLoginUserInfo()
    
    // APIを実行する
    const res = await fetch(`${FAMILY_TASK_API_URL}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(request)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
  
  /** タスクを削除する */
  delete: async (task: TaskDelete) => {
    
    /** ログインユーザ情報を取得する */
    const { session } = useLoginUserInfo()
    
    // APIを実行する
    const res = await fetch(`${FAMILY_TASK_API_URL}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(task)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
}
