import React from 'react'
import { parseDate } from 'utils/parseDate'

const Cells = ({ today, month, currentDay, handleModal, day, currentDate }) => {
  return (
    <td
      className={
        month !== currentDate.getMonth()
          ? 'bg-slate-300'
          : today === currentDay.getDate() && month === currentDay.getMonth()
          ? 'bg-blue-200'
          : 'bg-gray-50'
      }
      onDoubleClick={() => handleModal(day)}
    >
      {today}
      <div className='flex flex-col gap-1 p-1'>
        {day.events.map((event, index) => (
          <div
            className='bg-blue-600 text-white rounded-md'
            key={index}
          >
            {event.title} -{' '}
            {parseDate(event.time).hours + ':' + parseDate(event.time).minutes}
          </div>
        ))}
      </div>
    </td>
  )
}

export default Cells
