import React, { Suspense, lazy } from 'react'
import Button from './Button'
const CalendarTitle = lazy(() => import('./CalendarTitle'))

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
      <Suspense fallback={<div>Loading...</div>}>
        <CalendarTitle date={date} />
      </Suspense>
    </div>
  )
}

export default CalendarHead
