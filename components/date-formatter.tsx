import type { PropsWithChildren } from 'react'
import { parseISO, format } from 'date-fns'

type DateProps = { dateString: string }
export default function DateFormatter(props: PropsWithChildren<DateProps>) {
  const dateString = props.dateString ?? Date.now()
  const date = parseISO(props.dateString)
  const view = format(date, 'LLLL d, yyyy')

  return <time dateTime={dateString}>{view}</time>
}
