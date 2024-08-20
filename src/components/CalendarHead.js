import React from 'react'
import Button from './Button'
import { parseMonths } from 'utils/parseMonths'

const CalendarHead = ({ date, nextMonth, previousMonth }) => {
  return (
    <div className='flex w-auto items-center md:gap-0 md:flex-row m-4 gap-4 justify-between my-4'>
      <div className='flex order-2 md:order-1 gap-12 md:w-1/2'>
        <Button
          onClick={previousMonth}
          title='Previous'
        />
        <Button
          onClick={nextMonth}
          title='Next'
        />
      </div>
      <h1 className='flex order-1 font-bold text-2xl md:order-2 items-start md:w-1/2'>
        {parseMonths(date)} {date.getFullYear()}
      </h1>
    </div>
  )
}

export default CalendarHead
