"use client"

import { NextPage } from "next"
import { FormEvent, useCallback, useState } from "react"
import axios, { AxiosResponse } from "axios"

const SignIn: NextPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    username: [],
    password: []
  })
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      axios.post("/api/v1/sessions", formData).then(
        () => {
          alert("登录成功")
        },
        (error) => {
          if (error.response) {
            const response: AxiosResponse = error.response
            if (response.status === 422) {
              setErrors((prevErrors) => ({ ...prevErrors, ...response.data }))
            }
          }
        }
      )
    },
    [formData]
  )
  return (
    <>
      <h1>登录</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  username: e.target.value
                }))
              }
            />
          </label>
          {errors.username?.length > 0 && <div className="text-[red]">{errors.username.join(",")}</div>}
        </div>
        <div>
          <label>
            密码
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  password: e.target.value
                }))
              }
            />
          </label>
          {errors.password?.length > 0 && <div className="text-[red]">{errors.password.join(",")}</div>}
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  )
}

export default SignIn
