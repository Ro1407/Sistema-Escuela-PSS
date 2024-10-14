'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, eachDayOfInterval, isWeekend, addDays, isSameMonth } from "date-fns"
import { es } from 'date-fns/locale'

export default function AttendanceTracker() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [weekdays, setWeekdays] = useState<Date[]>([])
  const [attendance, setAttendance] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (startDate && endDate) {
      const days = eachDayOfInterval({ start: startDate, end: endDate })
        .filter(day => !isWeekend(day))
      setWeekdays(days)

      // Initialize attendance for each student
      const initialAttendance: Record<string, string[]> = {}
        ;['Armando Paredes', 'Marcela Perez'].forEach(student => {
          initialAttendance[student] = new Array(days.length).fill('')
        })
      setAttendance(initialAttendance)
    }
  }, [startDate, endDate])

  const handleAttendanceChange = (student: string, dayIndex: number, value: string) => {
    setAttendance(prev => ({
      ...prev,
      [student]: prev[student].map((v, i) => i === dayIndex ? value : v)
    }))
  }

  const renderMonthHeader = (day: Date, index: number, array: Date[]) => {
    if (index === 0 || !isSameMonth(day, array[index - 1])) {
      return (
        <th
          key={`month-${day.getTime()}`}
          className="border border-gray-300 px-2 py-2 bg-gray-100"
          colSpan={array.filter(d => isSameMonth(d, day)).length}
        >
          {format(day, 'MMMM yyyy', { locale: es })}
        </th>
      )
    }
    return null
  }

  return (
    <div className="flex px-0 max-w-full mx-auto overflow-x-auto">
      <div className="flex flex-col justify-between mb-4 mr-4 w-3/12">
        <div className="mb-2 sm:mb-8 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setStartDate(undefined)}>
            Modificar
          </Button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha cierre</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setEndDate(undefined)}>
            Modificar
          </Button>
        </div>
        <div className="mt-4 flex flex-col justify-center space-y-2">
          <Button variant="outline">Descartar</Button>
          <Button>Guardar</Button>
        </div>
      </div>

      {weekdays.length > 0 && (
        <div className="overflow-x-auto w-9/12">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100"></th>
                {weekdays.map((day, index, array) => renderMonthHeader(day, index, array))}
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100"></th>
                {weekdays.map((day, index) => (
                  <th key={index} className="border border-gray-300 px-2 py-1 text-sm">
                    {format(day, 'EEE d', { locale: es })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendance).map(([student, days], rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-gray-300 px-4 py-2 w-40 font-medium text-sm">{student}</td>
                  {days.map((value, dayIndex) => (
                    <td key={dayIndex} className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleAttendanceChange(student, dayIndex, e.target.value)}
                        className="w-full text-center focus:outline-none"
                        maxLength={1}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


    </div>
  )
}