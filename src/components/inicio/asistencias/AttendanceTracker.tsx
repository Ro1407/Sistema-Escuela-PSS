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
import { format, eachDayOfInterval, isWeekend, isSameMonth, parseISO, isValid, set } from "date-fns"
import { es } from 'date-fns/locale'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alumno } from '../../../../prisma/interfaces'
import { TipoAsistencia } from '@prisma/client'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select'
import { updateAttendance } from '@/lib/attendanceActions'


export default function AttendanceTracker({ alumnos }: { alumnos: Alumno[] }) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [weekdays, setWeekdays] = useState<Date[]>([])
  const [attendance, setAttendance] = useState<Record<string, Record<string, TipoAsistencia>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean, message: string } | null>(null)

  useEffect(() => {
    if (startDate && endDate) {
      const days = eachDayOfInterval({ start: startDate, end: endDate })
        .filter(day => !isWeekend(day))
      setWeekdays(days)

      const initialAttendance: Record<string, Record<string, TipoAsistencia>> = {}
      alumnos.forEach(alumno => {
        initialAttendance[alumno.id] = {}
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
            initialAttendance[alumno.id][format(day, 'yyyy-MM-dd')] = existingAttendance.tipo_asistencia;
          }
        })
      })
      setAttendance(initialAttendance)
    }
  }, [startDate, endDate, alumnos])

  const handleAttendanceChange = (alumnoId: string, date: string, value: TipoAsistencia) => {
    setAttendance(prev => ({
      ...prev,
      [alumnoId]: {
        ...prev[alumnoId],
        [date]: value
      }
    }))
  }

  const handleSubmit = async () => {
    console.log("hola manola")
    setIsSubmitting(true)
    try {
      const result = await updateAttendance(attendance)
      setResult(result)
    } catch (error) {
      console.error('Error al actualizar las asistencias:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <div className="flex flex-col justify-between mb-4 mr-4 w-2/12">
        <div className="flex flex-col mb-2 sm:mb-8 w-full">
          <Label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</Label>
          <Popover>
            <PopoverTrigger asChild className='mx-auto mt-4'>
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
          <Button variant="outline" size="sm" className="mt-4 w-[120px] mx-auto" onClick={() => setStartDate(undefined)}>
            Modificar
          </Button>
        </div>
        <div className='flex flex-col mb-2 sm:mb-8 justify-center align-middle'>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Fecha cierre</Label>
          <Popover>
            <PopoverTrigger asChild className='mx-auto mt-4'>
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
          <Button variant="outline" size="sm" className="mt-4 w-[120px] mx-auto" onClick={() => setEndDate(undefined)}>
            Modificar
          </Button>
        </div>
        <div className="mt-4 flex flex-col justify-center space-y-2">
          <Button variant="outline" onClick={() => setAttendance({})}>Descartar</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || weekdays.length === 0}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
          {result?.success === true && (
            <p className='text-green-500'>{result.message}</p>
          )}
          {result?.success === false && (
            <p className='text-red-500'>{result.message}</p>
          )}
        </div>
      </div>

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
              {alumnos.map((alumno) => (
                <TableRow key={alumno.id}>
                  <TableCell className="border border-gray-300 px-4 py-2 w-40 font-medium text-sm">{alumno.nombre + ' ' + alumno.apellido}</TableCell>
                  {weekdays.map((day, dayIndex) => {
                    const dateKey = format(day, 'yyyy-MM-dd')
                    return (
                      <TableCell key={dayIndex} className="border border-gray-300 px-2 py-1">
                        <Select
                          value={attendance[alumno.id]?.[dateKey] || ''}
                          onValueChange={(value) => handleAttendanceChange(alumno.id, dateKey, value as TipoAsistencia)}
                        >
                          <SelectTrigger className="w-full border-none">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(TipoAsistencia).map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo.charAt(0).toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}


    </div>
  )
}