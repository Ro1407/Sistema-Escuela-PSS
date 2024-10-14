import * as React from "react"
import { getAllAlumnos } from "../../../../../prisma/services/alumno.service"
import { getAllAmonestaciones } from "../../../../../prisma/services/amonestacion.service"
import AmonestacionesCliente from "./cliente-amonestaciones"
import { Alumno } from "../../../../../prisma/interfaces"


export interface Amonestacion {
  nombre: string
  tipo: string
  fecha: Date | null
  desc: string
  dniAlumno : string
}

export default async function InicioDocenteAmonestacionesPage() {
  let alums : Alumno[]
  alums = await getAllAlumnos()

  let amon = await getAllAmonestaciones()
  return(
    <div>
      <AmonestacionesCliente alumnos = {alums} amons = {amon}/>
    </div>
  )
  }