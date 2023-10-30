type QueryParams = { [key: string]: string }

export const getQueryParams = (search: string): QueryParams => {
  const searchParams = new URLSearchParams(search)
  let params: QueryParams = {}
  searchParams.forEach((value, key) => {
    let decodedKey: string, decodedValue: string
    try {
      // 使用 decodeURIComponent 解码
      decodedKey = decodeURIComponent(key)
      decodedValue = decodeURIComponent(value)
    } catch (e) {
      // 如果解码失败，则使用原始值
      decodedKey = key
      decodedValue = value
    }
    params[decodedKey] = decodedValue
  })
  return params
}
