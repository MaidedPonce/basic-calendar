import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { getAgenda } from 'services/agenda/get.agenda'
import { getWeeks } from 'utils/getWeeks'
import { isSameDay } from 'utils/isSameDay'

export const CalendarContext = createContext()

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([
    {
      time: new Date(2025, 0, 10, 0, 0),
      // eslint-disable-next-line quotes
      name: `Maided's birthday`,
    },
  ])

  const currentDay = new Date()
  const [month, setMonth] = useState(
    getWeeks(currentDate.getMonth(), currentDate.getFullYear())
  )

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }, [])

  const previousMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }, [])

  const handleModal = (day) => {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/ // Regex for HH:MM format
    let time = prompt('Please enter a time (HH:MM):')
    let name = ''

    // Validate the time format
    while (time !== null && !timePattern.test(time)) {
      alert(
        'Invalid time format. Please enter the time in HH:MM format (e.g., 14:30).'
      )
      time = prompt('Please enter a time (HH:MM):')
    }

    if (time) {
      name = prompt('Enter the name of the event:')
    }

    if (name && time) {
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
        const newEvents = [...events, { time: selectedTime, name }]
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
  const updatedMonth = useMemo(() => {
    return getWeeks(currentDate.getMonth(), currentDate.getFullYear()).map(
      (week) => {
        return week.map((day) => ({
          ...day,
          events: orderEvents(day.date),
        }))
      }
    )
  }, [currentDate, events])
  useEffect(() => {
    const data = localStorage.getItem('events')
    if (data) {
      setEvents(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    setMonth(updatedMonth)
  }, [updatedMonth])
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    if (hasFetched) return

    getAgenda({ signal })
      .then((data) => {
        if (!signal.aborted) {
          const getEvents = localStorage.getItem('events')
          const parsedEvents = JSON.parse(getEvents) || []
          const existingEventTimes = new Set(
            parsedEvents.map((e) => new Date(e.time).getTime())
          )
          const newEvents = data
            .map((event) => ({
              ...event,
              time: new Date(event.time),
            }))
            .filter((event) => !existingEventTimes.has(event.time.getTime()))

          if (newEvents.length > 0) {
            setEvents((dataSaved) => [...dataSaved, ...newEvents])
          }
          setHasFetched(true)
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          console.error(error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [hasFetched])
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
