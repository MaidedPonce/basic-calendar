import React, { Suspense, lazy, useContext } from 'react'
import { CalendarContext } from 'context/CalendarContext'
const CalendarHead = lazy(() => import('./CalendarHead'))
const Cells = lazy(() => import('./Cells'))

const Calendar = () => {
  const {
    currentDate,
    nextMonth,
    previousMonth,
    month,
    handleModal,
    currentDay,
  } = useContext(CalendarContext)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalendarHead
        date={currentDate}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
      />
      <div className='relative m-4 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase '>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Sunday
              </th>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Monday
              </th>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Tuesday
              </th>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Wednesday
              </th>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Thursday
              </th>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Friday
              </th>
              <th
                scope='col'
                className='px-6 py-3 bg-gray-50 text-center'
              >
                Saturday
              </th>
            </tr>
          </thead>
          <tbody className='border-b border-gray-200'>
            {month.map((week, index) => (
              <tr
                className='px-6 py-4 h-12 text-center font-medium text-gray-900 whitespace-nowrap bg-gray-50'
                key={index}
              >
                {week.map((day, index) => {
                  const month = day?.date.getMonth()
                  const today = day?.date.getDate()
                  return (
                    <Cells
                      key={index}
                      today={today}
                      month={month}
                      currentDay={currentDay}
                      handleModal={handleModal}
                      day={day}
                      currentDate={currentDate}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  )
}

export default Calendar
