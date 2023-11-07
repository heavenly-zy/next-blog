import { FormEvent, ReactNode, useCallback, useState } from "react"
import { AxiosResponse } from "axios"
import classNames from "classnames"

type Field<T> = {
  label: string
  type: "text" | "password" | "textarea"
  key: keyof T
  className?: string
}
type useFormOptions<T, K> = {
  initFormData: T
  fields: Field<T>[]
  buttons: ReactNode
  submit: {
    request: (formData: T) => Promise<AxiosResponse<K, any>>
    success?: (res: AxiosResponse<K, any>) => void | PromiseLike<void>
    successMessage?: string
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
    []
  )
  const _onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      submit.request(formData).then(
        (res) => {
          submit.success?.(res)
          submit.successMessage && alert(submit.successMessage)
        },
        (error) => {
          if (error.response) {
            const response: AxiosResponse = error.response
            if (response.status === 422) {
              setErrors((prevErrors) => ({ ...prevErrors, ...response.data }))
            } else if (response.status === 401) {
              alert(response?.data ?? "error")
              location.href = `/sign-in?return-to=${encodeURIComponent(location.pathname)}`
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
        <div key={field.key.toString()} className={classNames('field', `field-${field.key.toString()}`, field.className)}>
          <label className="label">
            <span className="label-text">
              {field.label}
            </span>
            {field.type === "textarea" ? (
              <textarea className="control" onChange={(e) => onChange(field.key, e.target.value)} value={formData[field.key].toString()} />
            ) : (
              <input
                className="control"
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
      <style jsx>{`
        .field {
          margin: 8px 0;
        }
        .label {
          display: flex;
          line-height: 32px;
        }
        .label input {
          height: 32px;
        }
        .label > .label-text {
          white-space: nowrap;
          margin-right: 1em;
        }
        .label > .control {
          width: 100%;
        }
      `}</style>
    </form>
  )
  return {
    form,
    setErrors
  }
}
