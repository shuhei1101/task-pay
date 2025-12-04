"use client"
import { useEffect, useState, useCallback } from "react"
import { useSession } from "./useSession"
import { appStorage } from "@/app/(core)/_sessionStorage/appStorage"
import { usersLoginGet } from "@/app/(user)/api/users/login/client"
import { UserInfoView } from "@/app/(user)/schema"

/** ログインユーザの情報を取得する */
export const useLoginUserInfo = () => {
  const { session, isLoading: sessionLoading } = useSession()
  const [userInfo, setUserInfo] = useState<UserInfoView>()
  const [isLoading, setIsLoading] = useState(true)

  /** ユーザ情報取得処理 */
  const fetchUserInfo = useCallback(async () => {
    setIsLoading(true)
    try {
      // セッションストレージからユーザ情報を取得する
      let info = appStorage.user.get()
      // ユーザ情報がない場合
      if (!info) {
        // ユーザ情報を取得する
        const data = await usersLoginGet()
        info = data.userInfo
        // ユーザ情報が取得できた場合、セッションストレージに格納する
        if (info) appStorage.user.set(info)
      }
      setUserInfo(info)
    } catch (err) {
      console.error(err)
      setUserInfo(undefined)
    } finally {
      // ロード状態を解除する
      setIsLoading(false)
    }
  }, [])

  // 初回取得
  useEffect(() => {
    if (sessionLoading || !session) return
    fetchUserInfo()
  }, [session, sessionLoading, fetchUserInfo])

  /** リフレッシュ関数 */
  const refresh = useCallback(() => fetchUserInfo(), [fetchUserInfo])

  return {
    userInfo,
    isLoading,
    session,
    refresh,
  }
}
