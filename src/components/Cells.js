import React from 'react'
import { parseDate } from 'utils/parseDate'

const Cells = ({
  today,
  month,
  year,
  currentDay,
  handleModal,
  day,
  currentDate,
}) => {
  return (
    <td
      className={
        month !== currentDate.getMonth()
          ? 'bg-slate-300'
          : today === currentDay.getDate() &&
            month === currentDay.getMonth() &&
            year === currentDay.getFullYear()
          ? 'bg-blue-200'
          : 'bg-gray-50'
      }
      onDoubleClick={() => handleModal(day)}
    >
      <div>{today}</div>
      <div className='flex flex-col gap-1 p-1'>
        {day.events.map((event, index) => (
          <div
            className='text-white bg-blue-600 rounded-md'
            key={`${event?.name}${index}`}
          >
            {event.name} -{' '}
            {parseDate(event.time).hours + ':' + parseDate(event.time).minutes}
          </div>
        ))}
      </div>
    </td>
  )
}

export default Cells
