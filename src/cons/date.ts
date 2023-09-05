import { format } from 'date-fns'

export const formatDate = (timestampString: string): string => {
  const timestamp = parseInt(timestampString, 10) * 1000
  const date = new Date(timestamp)
  return format(date, 'yyyy-MM-dd')
}
