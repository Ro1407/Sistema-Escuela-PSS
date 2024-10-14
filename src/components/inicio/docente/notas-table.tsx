'use client'

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useStateContext } from './stateContext'

type Fields = 'nombre' | 'field1' | 'field2' | 'field3' | 'field4' | 'field5' | 'field6' | 'field7';

export default function NotasTable() {
  const { cursoSeleccionado } = useStateContext()
  
  const alumnosCurso = cursoSeleccionado?.alumnos
  
  const [tableData, setTableData] = useState(alumnosCurso ? alumnosCurso.map(alumno => ({
    nombre: alumno.nombre + ' ' + alumno.apellido,
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
  })) : [])

  useEffect(() => {
    setTableData(alumnosCurso ? alumnosCurso.map(alumno => ({
      nombre: alumno.nombre + ' ' + alumno.apellido,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
    })) : [])
  }, [alumnosCurso])

  const calculateAverage = (f1: string, f2: string, f3: string) => {
    const values = [f1, f2, f3].map(v => parseInt(v) || 0)
    const sum = values.reduce((a, b) => a + b, 0)
    return (sum / 3).toFixed(2)
  }

  const handleChange = (index: number, field: Fields, value: string) => {
    const newData = [...tableData]
    
    // Only allow integer input for fields 1, 2, 3, 5, and 6
    if (['field1', 'field2', 'field3', 'field5', 'field6'].includes(field)) {
      const intValue = parseInt(value)
      if (!isNaN(intValue) && intValue >= 0 && intValue <= 10) {
        newData[index][field] = intValue.toString()
      } else {
        return // Don't update if it's not a valid integer
      }
    } else {
      newData[index][field] = value
    }

    // Calculate average for field4
    const average = calculateAverage(newData[index].field1, newData[index].field2, newData[index].field3)
    newData[index].field4 = average

    // Set field7 based on the conditions
    if (parseFloat(average) >= 7) {
      newData[index].field7 = average
      newData[index].field5 = ''
      newData[index].field6 = ''
    } else if (parseFloat(newData[index].field5) >= 7) {
      newData[index].field7 = newData[index].field5
      newData[index].field6 = ''
    } else if (newData[index].field6) {
      newData[index].field7 = newData[index].field6
    } else {
      newData[index].field7 = ''
    }

    setTableData(newData)
  }

  const isDisabled = (index: number, field: Fields) => {
    if (field === 'field4' || field === 'field7') return true // Always disable fields 4 and 7
    if (field === 'field5') {
      return parseFloat(tableData[index].field4) >= 7
    }
    if (field === 'field6') {
      return parseFloat(tableData[index].field4) >= 7 || parseFloat(tableData[index].field5) >= 7
    }
    return false
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Nombre</TableHead>
          <TableHead>Primer Trimestre</TableHead>
          <TableHead>Segundo Trimestre</TableHead>
          <TableHead>Tercer Trimestre</TableHead>
          <TableHead>Clasificación Anual</TableHead>
          <TableHead>Examen Enero</TableHead>
          <TableHead>Examen Marzo</TableHead>
          <TableHead>Clasificación Final</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.map((alumno, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{alumno.nombre}</TableCell>
            {['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'].map((field) => (
              <TableCell key={field}>
                <Input
                  value={alumno[field as Fields]}
                  onChange={(e) => handleChange(index, field as Fields, e.target.value)}
                  className="w-full"
                  disabled={isDisabled(index, field as Fields)}
                  type={['field1', 'field2', 'field3', 'field5', 'field6'].includes(field) ? 'number' : 'text'}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}