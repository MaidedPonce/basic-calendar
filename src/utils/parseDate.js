export function parseDate(timeString) {
  const date = new Date(timeString)
  const parsedHours = date.getHours()
  const parsedMinutes = date.getMinutes()

  return {
    hours: parsedHours,
    minutes: parsedMinutes,
  }
}
