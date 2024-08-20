/*
  Both functions return an array of weeks, where each week is an array of dates.
    
  1. The first function is more space-efficient (O(n)) as it calculates the dates for the previous and next months only when necessary.
     - This leads to better memory usage, especially for months that don't require many additional dates from adjacent months.

  2. The second function, while still O(n) in time complexity, may use more space unnecessarily by calculating dates for the previous month across all weeks.
     - This can result in higher memory usage and slightly less optimal performance.
     
*/

export function getWeeks(mes, año) {
  const initialDate = new Date(año, mes, 1)
  const lastDayOfMonth = new Date(año, mes + 1, 0)
  const previousMonth = new Date(año, mes, 0)
  const weeks = []
  let semanaActual = []

  let previousMonthDays = 0
  let nextMonthDays = 0

  if (initialDate.getDay() !== 0) {
    previousMonthDays = initialDate.getDay()
  }

  if (lastDayOfMonth.getDay() !== 6) {
    nextMonthDays = 7 - lastDayOfMonth.getDay() - 1
  }

  const totalDays = lastDayOfMonth.getDate() + nextMonthDays

  for (let i = -previousMonthDays; i < totalDays; i++) {
    let date

    if (i < 0) {
      // Calculate the date for the days of the previous month
      date = new Date(
        año,
        mes - 1,
        previousMonth.getDate() + i + 1 // This starts from the first relevant day of the previous month.
      )
    } else {
      // Calculate the date for the days of the current month
      date = new Date(año, mes, i + 1)
    }

    semanaActual.push({ date, events: [] })

    // If it is Saturday or the last day of the month, the week is closed.
    if (date.getDay() === 6 || i === totalDays - 1) {
      weeks.push(semanaActual)
      semanaActual = []
    }
  }

  return weeks
}

/* export function getWeeks(mes, año) {
  const numberOfDays = new Date(año, mes + 1, 0).getDate();
  const weeks = [];
  let semanaActual = [];
  if (new Date(año, mes, 1).getDay() !== 0) {
    // If the month does not start on a Sunday, add days from the previous month
    const lastDayOfLastMonth = new Date(año, mes, 0).getDate();
    const startDay = lastDayOfLastMonth - new Date(año, mes, 1).getDay() + 1;
    console.log(startDay, lastDayOfLastMonth)
    for (let day = startDay; day <= lastDayOfLastMonth; day++) {
      const date = new Date(año, mes - 1, day);
      semanaActual.push(date);
    }
  }

  for (let day = 1; day <= numberOfDays; day++) {
    const date = new Date(año, mes, day);
    semanaActual.push(date);

    // If it is Sunday (weekend) or the last day of the month
    if (date.getDay() === 6 || day === numberOfDays) {
      if (date.getDay() !== 6) {
          // If the month ends on Saturday, add days from the following month
          const endDay = 6 - date.getDay();
          for (let day = 1; day <= endDay; day++) {
              const date = new Date(año, mes + 1, day);
              semanaActual.push(date);
          }
       }
      weeks.push(semanaActual);
      semanaActual = [];
    }
    
  }

  return weeks;
} */
