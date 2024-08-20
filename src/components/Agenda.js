import { CalendarContext } from 'context/CalendarContext'
import React, { useContext, useEffect, useState } from 'react'
import { parseDate } from 'utils/parseDate'

const Agenda = () => {
  const { events } = useContext(CalendarContext)
  const [sortedEvents, setSortedEvents] = useState([])

  useEffect(() => {
    const sorted = [...events].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    )
    setSortedEvents(sorted)
  }, [events])
  return (
    <section className='flex flex-col lg:w-1/4'>
      <h1 className='font-bold text-2xl m-4'>My agenda</h1>

      <ul className='lg:m-4 overflow-auto rounded-md shadow-md p-2 max-w-max m-auto'>
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => {
            return (
              <li
                key={`${event?.name}${index}`}
                className='grid grid-cols-2 m-4 items-center gap-4'
              >
                <span className='text-gray-500 text-start'>
                  {' '}
                  {parseDate(event.time).hours +
                    ':' +
                    parseDate(event.time).minutes +
                    ' ' +
                    parseDate(event.time).year}
                </span>
                <span className='text-end font-medium'>{event.name}</span>
              </li>
            )
          })
        ) : (
          <p className='m-4 text-gray-500'>No events scheduled.</p>
        )}
      </ul>
    </section>
  )
}

export default Agenda
