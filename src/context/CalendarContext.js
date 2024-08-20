import { createContext, useEffect, useState } from 'react'
import { getWeeks } from 'utils/getWeeks'
import { isSameDay } from 'utils/isSameDay'

export const CalendarContext = createContext()

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([])
  const currentDay = new Date()
  const [month, setMonth] = useState(
    getWeeks(currentDate.getMonth(), currentDate.getFullYear())
  )

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const previousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const handleModal = (day) => {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/ // Regex for HH:MM format
    let time = prompt('Please enter a time (HH:MM):')
    let title = ''

    // Validate the time format
    while (time !== null && !timePattern.test(time)) {
      alert(
        'Invalid time format. Please enter the time in HH:MM format (e.g., 14:30).'
      )
      time = prompt('Please enter a time (HH:MM):')
    }

    if (time) {
      title = prompt('Enter the title of the event:')
    }

    if (title && time) {
      const [hours, minutes] = time.split(':')
      const selectedTime = new Date(
        day.date.getFullYear(),
        day.date.getMonth(),
        day.date.getDate(),
        parseInt(hours, 10),
        parseInt(minutes, 10)
      )

      const existEvent = events.find(
        (event) => new Date(event.time).getTime() === selectedTime.getTime()
      )

      if (!existEvent) {
        const newEvents = [...events, { title, time: selectedTime }]
        setEvents(newEvents)
        localStorage.setItem('events', JSON.stringify(newEvents))
      } else {
        alert('There is already an event at this time.')
      }
    }
  }

  const orderEvents = (day) => {
    return events.filter((event) => isSameDay(day, new Date(event.time)))
  }

  useEffect(() => {
    const data = localStorage.getItem('events')
    if (data) {
      setEvents(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    const updatedMonth = getWeeks(
      currentDate.getMonth(),
      currentDate.getFullYear()
    ).map((week) => {
      return week.map((day) => ({
        ...day,
        events: orderEvents(day.date),
      }))
    })
    setMonth(updatedMonth)
  }, [currentDate, events])

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        currentDay,
        month,
        nextMonth,
        previousMonth,
        handleModal,
        events,
        orderEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
