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
    <div className='flex flex-col lg:w-3/4'>
      <CalendarHead
        date={currentDate}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <div className='relative m-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 rtl:text-right'>
            <thead className='text-xs text-gray-700 uppercase '>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Sunday
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Monday
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Tuesday
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Wednesday
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Thursday
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Friday
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center bg-gray-50'
                >
                  Saturday
                </th>
              </tr>
            </thead>
            <tbody className='border-b border-gray-200'>
              {month.map((week, index) => (
                <tr
                  className='h-12 px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap bg-gray-50'
                  key={index}
                >
                  {week.map((day, index) => {
                    const month = day?.date.getMonth()
                    const today = day?.date.getDate()
                    const year = day?.date.getFullYear()
                    return (
                      <Cells
                        key={`${today}${index}`}
                        today={today}
                        month={month}
                        currentDay={currentDay}
                        handleModal={handleModal}
                        day={day}
                        year={year}
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
    </div>
  )
}

export default Calendar
