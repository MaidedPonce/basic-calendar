import React from 'react'
import { parseMonths } from 'utils/parseMonths'

const CalendarTitle = ({ date }) => {
  return (
    <div className='flex order-1 font-bold text-2xl md:order-2 items-start md:w-1/2'>
      <h1>
        {parseMonths(date)} {date.getFullYear()}
      </h1>
    </div>
  )
}

export default CalendarTitle
