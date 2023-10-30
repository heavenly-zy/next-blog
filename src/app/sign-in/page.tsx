"use client"

import { NextPage } from "next"
import { useState } from "react"
import axios from "axios"
import { User } from "@/entity/User"
import { useForm } from "@/hooks/useForm"

const SignIn: NextPage = () => {
  const [currentUser, setUser] = useState<Partial<User>>()
  const { form } = useForm({
    initFormData: { username: "", password: "" },
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" }
    ],
    buttons: <button type="submit">登录</button>,
    submit: {
      request: (formData) =>
        axios.post<Partial<User>>("/api/v1/sessions", formData, {
          headers: { "Cache-Control": "no-store" }
        }),
      success: (res) => {
        setUser(res.data)
      },
      successMessage: "登录成功"
    }
  })
  return (
    <>
      {currentUser && <div>当前登录用户为 {currentUser.username}</div>}
      <h1>登录</h1>
      {form}
    </>
  )
}

export default SignIn
