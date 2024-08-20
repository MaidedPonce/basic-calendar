import Agenda from 'components/Agenda'
import Calendar from 'components/Calendar'
import React from 'react'

const CalendarContainer = () => {
  return (
    <section className='flex justify-between flex-col lg:flex-row max-w-[1200px] mx-auto my-6'>
      <Calendar />
      <Agenda />
    </section>
  )
}

export default CalendarContainer
