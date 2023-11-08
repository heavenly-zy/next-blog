"use client"

import { Post } from "@/entity/Post";
import { useForm } from "@/hooks/useForm"
import axios from "axios"

export const EditForm = (props: { post: Post }) => {
  const { form } = useForm({
    initFormData: { title: props.post.title, content: props.post.content },
    fields: [
      { label: "标题", type: "text", key: "title" },
      { label: "内容", type: "textarea", key: "content" }
    ],
    buttons: <button type="submit">提交</button>,
    submit: {
      request: (formData) => axios.patch(`/api/v1/posts/${props.post.id}`, formData),
      successMessage: "修改成功"
    }
  })
  return (
    <>
      <div className="post-edit">{form}</div>
      <style jsx global>{`
        .post-edit {
          padding: 16px;
        }
        .post-edit .field-content textarea {
          height: 20em;
          resize: none;
        }
      `}</style>
    </>
  )
}
