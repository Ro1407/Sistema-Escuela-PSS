'use client'
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FechaActual } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { Alumno } from "../../../../../prisma/interfaces"
import { Amonestacion } from "../../../../../prisma/interfaces"
import { Tipo } from '@prisma/client';
import { sendAmonestacion } from "../../../../lib/actions";
import { useStateContext } from "@/components/inicio/docente/stateContext"

export default function AmonestacionesCliente({ alumnos, amons }: { alumnos: Alumno[], amons: Amonestacion[] }) {
    const [alumnoSelect, setAlumnoSelect] = useState<Alumno | null>(null)
    const [amonSelect, setAmonSelect] = useState<Amonestacion | null>(null)

    return (
        <div>
            <ListadoAlumnos
                setterAlumno={setAlumnoSelect}
                setterAmon={setAmonSelect}
                alums={alumnos}
                amons={amons}
                alumnoSelect={alumnoSelect}
                amonSelect={amonSelect} />
        </div>
    )
}


function ListadoAlumnos(
    { setterAlumno, setterAmon, alums, amons, alumnoSelect, amonSelect }:
        {
            setterAlumno: (alumno: Alumno) => void,
            setterAmon: (amon: Amonestacion) => void,
            alums: Alumno[],
            amons: Amonestacion[],
            alumnoSelect: Alumno | null,
            amonSelect: Amonestacion | null
        }) {
    const { cursoSeleccionado, setCursoSeleccionado } = useStateContext()
    return (
        <div className="flex flex-row items-center p-2">
            <div className="flex flex-col items-center p-2">
                <h2 className="mb-4 ">Alumnos del curso</h2>
                <ScrollArea className="h-[400px] w-48 rounded-md border">
                    <div className="flex flex-col p-4">
                        {
                            (alums.filter((al) => (al.cursoId === cursoSeleccionado?.id))).map((alum, index) => (
                                <Button
                                    variant="outline"
                                    onClick={() => setterAlumno(alum)}
                                    className={alumnoSelect?.dni === alum.dni ? 'bg-blue-500 text-white' : ''}
                                >
                                    {`${alum.nombre} ${alum.apellido}`}
                                </Button>
                            ))
                        }
                    </div>
                </ScrollArea>
            </div>
            {
                alumnoSelect ?
                    (
                        <ListadoAmons setter={setterAmon} amons={amons.filter(a => (a.alumnoId === alumnoSelect.id))} alumno={alumnoSelect} amonSelect={amonSelect} />
                    ) : (<div></div>)
            }
            {
                amonSelect ? (
                    amonSelect.alumnoId === "" ? (
                        <PanelNewAmon alumno={alumnoSelect} />
                    ) : (null)
                ) : (<div />)
            }
        </div>
    )
}

function crearAmon(setter: (amon: Amonestacion) => void, alum: Alumno) {
    let newAmon: Amonestacion = {
        id: "",
        tipo: Tipo.AMONESTACION,
        fecha: new Date(),
        descripcion: "",
        firma: false,
        alumnoId: "",
    }
    setter(newAmon)
}

function ListadoAmons({ setter, amons, alumno, amonSelect }: { setter: (amon: Amonestacion) => void, amons: Amonestacion[], alumno: Alumno, amonSelect: Amonestacion | null }) {
    const penalizaciones: Amonestacion[] = amons.filter(amon => amon.alumnoId = alumno.id)
    console.log("por aca")
    return (
        <div className="flex flex-col items-center p-2">
            <h2 className="mb-4 ">Amonestaciones y Sanciones</h2>
            <ScrollArea className="h-[300px] w-48 rounded-md border">
                <div className="flex flex-col p-4">
                    {
                        penalizaciones.map((p, index) => (
                            <Button variant="outline"
                                onClick={() => { alert("Work In Progress") }}
                            >
                                {p.tipo + " - " + index}
                            </Button>
                        ))
                    }
                </div>
            </ScrollArea>
            <Button
                variant="outline"
                className="mt-2"
                onClick={() => crearAmon(setter, alumno)}
            >
                Agregar
            </Button>
            <Button
                variant="outline"
                className="mt-2"
                onClick={() => alert("Work in Progress")}
            >
                Eliminar
            </Button>
        </div>
    )
}

function PanelNewAmon({ alumno }: { alumno: Alumno | null }) {
    const [descState, setDescState] = useState("")
    const [typeState, setTypeState] = useState<Tipo>("AMONESTACION");
    function typeHandler(t: string): void {
        setTypeState(t === "AMONESTACION" ? Tipo.AMONESTACION : Tipo.SANCION);
    }

    function descHandler(value: string): void {
        setDescState(value);
    }

    async function sendAmonHandler(alum: Alumno | null): Promise<void> {
        if (descState === "") {
            alert("Debe completar la descripción");
            return;
        }

        if (alum !== null) {
            try {
                await sendAmonestacion(alum.id, typeState, descState);
                console.log("Amonestación creada con éxito");
                refrescar();
            } catch (error) {
                console.error("Error creando la amonestación:", error);
            }
        }
    }

    function descartar() {
        refrescar()
    }
    return (
        <div className="flex flex-col w-full items-center py-2 px-8 space-y-4">
            <h3>Tipo:</h3>
            <Tabs defaultValue="amonestacion">
                <TabsList>
                    <TabsTrigger value="amonestacion" onClick={() => typeHandler("AMONESTACION")}>Amonestación</TabsTrigger>
                    <TabsTrigger value="sancion" onClick={() => typeHandler("SANCION")}>Sanción</TabsTrigger>
                </TabsList>
            </Tabs>
            <h3>Fecha:</h3>
            <FechaActual />
            <h3>Descripción:</h3>
            <Textarea onChange={(e) => descHandler(e.target.value)} />
            <div className="flex flex-row">
                <Button variant="outline" onClick={() => descartar()}>
                    Descartar
                </Button>
                <Button variant="outline" onClick={() => sendAmonHandler(alumno)}>
                    Guardar
                </Button>
            </div>
        </div>
    )
}

function refrescar() {
    window.location.reload()
}