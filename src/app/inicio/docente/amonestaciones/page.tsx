'use client'

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import WIPSplash from "../wip-splash"

interface Alumno {
  nombre: string
}

interface Amonestacion {
  nombre: string
  tipo: string
  fecha: Date | null
  desc: string
  alumno : Alumno
}

export default function InicioDocenteAmonestacionesPage() {
  const [alumnoSelect, setAlumnoSelect] = useState<Alumno | null>(null) // <<<<<<<------------------------
  const [amonSelect, setAmonSelect] = useState<Amonestacion | null>(null) // <<<<<<<-----------------------
  return (
    <div className="flex flex-row items-left">
      <ListadoAlumnos setter={setAlumnoSelect} alumno={alumnoSelect} />
      {
        alumnoSelect ?
          (
            <ListadoAmons setter={setAmonSelect} alumno={alumnoSelect} amon={amonSelect} />
          ) : (<div></div>)
      }
      {
        amonSelect ? (
          amonSelect.nombre === "" ? (
            <PanelNewAmon alumno = {alumnoSelect}/>
          ):(<WIPSplash/>)
        ) : (<div/>)
      }
    </div>
  )
}

function PanelNewAmon({alumno} : {alumno : Alumno | null}) {
  const [descState,setDescState] = useState("")
  const [typeState,setTypeState] = useState("amon")
  function typeHandler(t: string): void {
    setTypeState(t)
  }

  function descHandler(value: string): void {
    setDescState(value)
  }

  function sendAmonHandler(alum : Alumno | null): void {
    const finalAmon = {nombre : "(id)", 
                       tipo : typeState, 
                      fecha : new Date(), 
                      desc : descState, 
                      alumno : alum}
    console.log(finalAmon)
  }

  function descartar(){
    window.location.reload()
  }
  
  return (
    <div className="flex flex-col w-full items-center py-2 px-8 space-y-4">
      <h3>Tipo:</h3>
      <Tabs defaultValue = "amonestacion">
        <TabsList>
          <TabsTrigger value="amonestacion" onClick = {() => typeHandler("amon")}>Amonestación</TabsTrigger>
          <TabsTrigger value="sancion" onClick = {() => typeHandler("sans")}>Sanción</TabsTrigger>
        </TabsList>
      </Tabs>
      <h3>Fecha:</h3>
      <DatePicker/>
      <h3>Descripción:</h3>
      <Textarea onChange = {(e) => descHandler(e.target.value)}/>
      <div className = "flex flex-row">
        <Button variant = "outline" onClick = {() => descartar()}>
          Descartar
        </Button>
        <Button variant = "outline" onClick = {() =>sendAmonHandler(alumno)}>
          Guardar
        </Button>
      </div>
    </div>
  )
}
function ListadoAlumnos({ setter, alumno }: { setter: (alumno: Alumno) => void, alumno: Alumno | null }) {
  const alumnos = getAlumnos()
  return (
    <div className="flex flex-col items-center p-2">
      <h2 className="mb-4 ">Alumnos del curso</h2>
      <ScrollArea className="h-[400px] w-48 rounded-md border">
        <div className="flex flex-col p-4">
          {
            alumnos.map((alum, index) => (
              <Button
                variant="outline"
                onClick={() => setter(alum)}
                className={alumno?.nombre === alum.nombre ? 'bg-blue-500 text-white' : ''}
              >
                {alum.nombre}
              </Button>
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}

function crearAmon( setter: (amon: Amonestacion) => void,alum : Alumno){
  let newAmon : Amonestacion = {
    nombre:"",
    tipo:"",
    fecha: new Date(), 
    desc:"",
    alumno : alum
  }
  setter(newAmon)
}

function ListadoAmons({ setter, alumno, amon }: { setter: (amon: Amonestacion) => void, alumno: Alumno, amon: Amonestacion | null }) {
  const penalizaciones: Amonestacion[] = getAmons(alumno).concat(getSans(alumno))
  console.log("por aca")
  return (
    <div className="flex flex-col items-center p-2">
      <h2 className="mb-4 ">Amonestaciones y Sanciones</h2>
      <ScrollArea className="h-[300px] w-48 rounded-md border">
        <div className="flex flex-col p-4">
          {
            penalizaciones.map((p, index) => (
              <Button variant="outline"
                onClick={() => {alert("Work In Progress")}}
              >
                {p.nombre}
              </Button>
            ))
          }
        </div>
      </ScrollArea>
      <Button
        variant="outline"
        className="mt-2"
        onClick = {() => crearAmon(setter,alumno)}
      >
        Agregar
      </Button>
      <Button
        variant="outline"
        className="mt-2"
        onClick = {() => alert("Work in Progress")}
      >
        Eliminar
      </Button>
    </div>
  )
}

function getAlumnos() {
  let alumnos: Alumno[] = []
  for (let i = 0; i < 30; i++) {
    let a: Alumno = { nombre: "alum" + i }
    alumnos.push(a)
  }
  return alumnos
}

function getAmons(alum: Alumno): Amonestacion[] {
  const cantMax = 10
  const alumnoIndex = parseInt(alum.nombre.replace("alum", ""));
  const cantidadAmons = Math.floor(Math.random() * cantMax) + 1;
  let amons: Amonestacion[] = [];
  for (let i = 0; i < cantidadAmons; i++) {
    let amon: Amonestacion = {
      nombre: `Amonestacion${alumnoIndex}${String.fromCharCode(65 + i)}`,
      tipo: "amon",
      fecha: new Date(),
      desc: "amonestacion " + i,
      alumno : alum
    }
    amons.push(amon);
  }
  return amons
}

function getSans(alum: Alumno): Amonestacion[] {
  const cantMax = 5
  const alumnoIndex = parseInt(alum.nombre.replace("alum", ""));
  const cantidadSanciones = Math.floor(Math.random() * cantMax) + 1;
  let sanciones: Amonestacion[] = [];
  for (let i = 0; i < cantidadSanciones; i++) {
    let amon: Amonestacion = {
      nombre: `Sancion${alumnoIndex}${String.fromCharCode(65 + i)}`,
      tipo: "sancion",
      fecha: new Date(),
      desc: "sans " + i,
      alumno : alum
    }
    sanciones.push(amon);
  }
  return sanciones
}