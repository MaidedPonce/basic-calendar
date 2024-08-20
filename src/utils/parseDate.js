export function parseDate(timeString) {
  const date = new Date(timeString)
  const parsedHours = date.getHours()
  const parsedMinutes = date.getMinutes()
  const parsedYear = date.getFullYear()

  return {
    hours: parsedHours,
    minutes: parsedMinutes,
    year: parsedYear,
  }
}
