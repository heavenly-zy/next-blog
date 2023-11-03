import Link from "next/link"

type Options = {
  page: number
  pageCount: number
  urlMaker?: (n: number) => string
}
const defaultUrlMaker = (n: number) => `?page=${n}`

export const usePager = (options: Options) => {
  const { page, pageCount, urlMaker: _urlMaker } = options
  const urlMaker = _urlMaker || defaultUrlMaker
  const numbers = []
  numbers.push(1)
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i)
  }
  numbers.push(1)
  const pageNumbers = [...new Set(numbers)]
    .sort()
    .filter((n) => n >= 1 && n <= pageCount)
    .reduce(
      (result: number[], n) =>
        n - (result[result.length - 1] || 0) === 1 ? result.concat(n) : result.concat(-1, n),
      []
    )

  const pager = (
    <div className="wrapper">
      {page !== 1 && <Link href={urlMaker(page - 1)}>上一页</Link>}
      {pageNumbers.map((n) =>
        n === -1 ? (
          <span key={n}>...</span>
        ) : (
          <Link href={urlMaker(n)} key={n}>
            {n}
          </Link>
        )
      )}
      {page < pageCount && <Link href={urlMaker(page + 1)}>下一页</Link>}
      <span>
        第 {page} / {pageCount} 页
      </span>

      <style jsx>{`
        .wrapper {
          margin: 0 -8px;
        }
        .wrapper a,
        .wrapper span {
          margin: 0 8px;
        }
      `}</style>
    </div>
  )
  return { pager }
}
