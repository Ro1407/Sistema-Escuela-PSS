'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TipoAsistencia } from '@prisma/client'
import { eachDayOfInterval, format, isSameMonth, isValid, isWeekend, parseISO } from "date-fns"
import { es } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Alumno } from '../../../../prisma/interfaces'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'


export default function AttendanceViewer({ alumno }: { alumno: Alumno }) {
  const [weekdays, setWeekdays] = useState<Date[]>([])
  const [attendance, setAttendance] = useState<Record<string, TipoAsistencia>>({})

  useEffect(() => {
    let startDateUTC: Date | null = null;
    let endDateUTC: Date | null = null;
  
    const timeZone = 'UTC'; // Forzamos UTC
  
    const startDate = alumno.asistencia?.at(0)?.fecha;
    const endDate = alumno.asistencia?.at(-1)?.fecha;
  
    if (typeof startDate === 'string') {
      startDateUTC = toZonedTime(parseISO(startDate), timeZone); // Convertimos al tiempo UTC
    } else if (startDate instanceof Date) {
      startDateUTC = toZonedTime(startDate, timeZone); // Si ya es Date, lo convertimos a UTC
    }
  
    if (typeof endDate === 'string') {
      endDateUTC = toZonedTime(parseISO(endDate), timeZone); // Convertimos al tiempo UTC
    } else if (endDate instanceof Date) {
      endDateUTC = toZonedTime(endDate, timeZone); // Si ya es Date, lo convertimos a UTC
    }

    console.log({ startDateUTC, endDateUTC })

    if (startDateUTC && endDateUTC) {
      const days = eachDayOfInterval({ start: startDateUTC, end: endDateUTC })
        .filter(day => !isWeekend(day))
      setWeekdays(days)

      const initialAttendance: Record<string, TipoAsistencia> = {}
      days.forEach(day => {
        const existingAttendance = alumno.asistencia?.find(a => {
          let asistenciaDate: Date | null = null;

          // Si la fecha es string, la convertimos usando parseISO para asegurar UTC
          if (typeof a.fecha === 'string') {
            asistenciaDate = parseISO(a.fecha); // Parseamos la fecha en formato ISO
          } else if (a.fecha instanceof Date) {
            asistenciaDate = a.fecha; // Si ya es un Date, lo usamos directamente
          }

          // Aseguramos que la fecha es válida y trabajamos con UTC para comparar solo día, mes y año
          return asistenciaDate && isValid(asistenciaDate) &&
            asistenciaDate.getUTCFullYear() === day.getUTCFullYear() &&
            asistenciaDate.getUTCMonth() === day.getUTCMonth() &&
            asistenciaDate.getUTCDate() === day.getUTCDate();
        });

        // Si encontramos una asistencia, la asignamos
        if (existingAttendance) {
          initialAttendance[format(day, 'yyyy-MM-dd')] = existingAttendance.tipo_asistencia;
        }
      })

      setAttendance(initialAttendance)
    }

  }, [alumno])


  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const renderMonthHeader = (day: Date, index: number, array: Date[]) => {
    if (index === 0 || !isSameMonth(day, array[index - 1])) {
      const formattedMonth = format(day, 'MMMM yyyy', { locale: es })
      const capitalizedMonth = capitalizeFirstLetter(formattedMonth)

      return (
        <TableHead
          key={`month-${day.getTime()}`}
          className="border border-gray-300 px-2 py-2 bg-gray-50 text-center"
          colSpan={array.filter(d => isSameMonth(d, day)).length}
        >
          {capitalizedMonth}
        </TableHead>
      )
    }
    return null
  }

  return (
    <div className="flex px-0 max-w-full mx-auto overflow-x-auto">
      {weekdays.length > 0 && (
        <div className="overflow-x-auto w-10/12">
          <Table className="min-w-full border-collapse border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead className="border border-gray-300 px-4 py-2 bg-gray-100"></TableHead>
                {weekdays.map((day, index, array) => renderMonthHeader(day, index, array))}
              </TableRow>
              <TableRow>
                <TableHead className="border border-gray-300 px-4 py-2 bg-gray-100"></TableHead>
                {weekdays.map((day, index) => (
                  <TableHead key={index} className="border border-gray-300 px-2 py-1 text-sm">
                    {format(day, 'EEE d', { locale: es })}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={alumno.id}>
                <TableCell className="border border-gray-300 px-4 py-2 w-40 font-medium text-sm">{alumno.nombre + ' ' + alumno.apellido}</TableCell>
                {weekdays.map((day, dayIndex) => {
                  const dateKey = format(day, 'yyyy-MM-dd')
                  return (
                    <TableCell key={dayIndex} className="border border-gray-300 px-2 py-1">
                      {attendance[dateKey].charAt(0) || ''}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}


    </div>
  )
}