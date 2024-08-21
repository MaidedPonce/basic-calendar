import React, { Suspense, lazy } from 'react'
import Calendar from 'components/Calendar'
const Agenda = lazy(() => import('../components/Agenda'))

const CalendarContainer = () => {
  return (
    <section className='flex justify-between flex-col lg:flex-row max-w-[1200px] mx-auto my-6'>
      <Calendar />
      <Suspense fallback={<div>Loading...</div>}>
        <Agenda />
      </Suspense>
    </section>
  )
}

export default CalendarContainer
