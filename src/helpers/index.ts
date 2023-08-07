import { getTimeT } from 'types'
import i18next, { flagEmoji, lang } from 'i18n'

function getTimeStamp({ lastTime, type = '' }: getTimeT) {
  const dateNow = Date.now()
  let date: Date = new Date(lastTime)

  const day = 86400000
  const difference = dateNow - lastTime

  if (difference <= 20000) {
    return i18next.t(`timestamps${type}.now`)
  } else if (difference <= day) {
    return i18next.t(`timestamps${type}.today`)
  } else if (difference <= day * 2) {
    return i18next.t(`timestamps${type}.yday`)
  } else if (difference <= 30 * day) {
    const days = Math.floor(difference / day)
    return `${days}${i18next.t(`timestamps${type}.d`)}`
  } else if (difference < 12 * 30 * day) {
    const month = Math.floor(difference / (day * 30))
    return `${month}${i18next.t(`timestamps${type}.m`)}`
  } else {
    return `${date.getHours()}:${date.getMinutes()} · ${date.getDate()}/${date.getMonth()}/${date
      .getFullYear()
      .toString()
      .substr(2, 2)}`
  }
}
