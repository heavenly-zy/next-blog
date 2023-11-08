"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const RemovePostButton = (props: { postId: string }) => {
  const router = useRouter()
  const onRemove = useCallback(() => {
    if (!window.confirm("确认删除吗？")) return
    axios.delete(`/api/v1/posts/${props.postId}`).then(
      () => {
        alert("删除成功")
        router.push("/posts")
      },
      () => {
        alert("删除失败")
      }
    )
  }, [props.postId, router])
  return <button onClick={onRemove}>删除</button>
}
