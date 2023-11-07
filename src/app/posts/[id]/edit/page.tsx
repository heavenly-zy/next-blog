"use client"

import { useForm } from "@/hooks/useForm"
import axios from "axios"

const PostEditPage = ({ params }: { params: { id: string } }) => {
  console.log('params: ', params);
  const { form } = useForm({
    initFormData: { title: "", content: "" },
    fields: [
      { label: "标题", type: "text", key: "title" },
      { label: "内容", type: "textarea", key: "content" }
    ],
    buttons: <button type="submit">提交</button>,
    submit: {
      request: (formData) => axios.post("/api/v1/posts", formData),
      success: () => {
        location.href = '/posts'
      },
      successMessage: "提交成功"
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

export default PostEditPage
