import { FormEvent, ReactNode, useCallback, useState } from "react"
import { AxiosResponse } from "axios"

type Field<T> = {
  label: string
  type: "text" | "password" | "textarea"
  key: keyof T
}
type useFormOptions<T, K> = {
  initFormData: T
  fields: Field<T>[]
  buttons: ReactNode
  submit: {
    request: (formData: T) => Promise<AxiosResponse<K, any>>
    callback?: (res: AxiosResponse<K, any>) => void | PromiseLike<void>
    message: string
  }
}

export function useForm<T extends Record<string, any>, K>(options: useFormOptions<T, K>) {
  const { initFormData, fields, buttons, submit } = options
  const [formData, setFormData] = useState(initFormData)
  const [errors, setErrors] = useState(() => {
    const _errors: { [k in keyof T]?: string[] } = {}
    for (const key in initFormData) {
      initFormData.hasOwnProperty(key) && (_errors[key] = [])
    }
    return _errors
  })
  const onChange = useCallback(
    (key: keyof T, value: any) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: value
      }))
    },
    [formData]
  )
  const _onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      submit.request(formData).then(
        (res) => {
          submit.callback?.(res)
          alert(submit.message)
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
    [submit, formData]
  )
  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field) => (
        <div key={field.key.toString()}>
          <label>
            {field.label}
            {field.type === "textarea" ? (
              <textarea onChange={(e) => onChange(field.key, e.target.value)} value={formData[field.key].toString()} />
            ) : (
              <input
                type={field.type}
                value={formData[field.key].toString()}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}
          </label>
          {(errors[field.key]?.length ?? 0) > 0 && <div className="text-[red]">{errors[field.key]?.join(",")}</div>}
        </div>
      ))}
      <div>{buttons}</div>
    </form>
  )
  return {
    form,
    setErrors
  }
}
