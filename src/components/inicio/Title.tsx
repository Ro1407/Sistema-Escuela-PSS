'use client'

import { usePathname } from "next/navigation";
import { formatearFecha } from "@/lib/utils";

export default function Title() {
  const pathname = usePathname();
  const fechaActual = formatearFecha(new Date());
  const getTitle = () => {
    const segments = pathname.split('/');
    var lastSegment = segments[segments.length - 1];

    // Eliminar guiones y poner la primera letra en mayúscula
    lastSegment = lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (lastSegment === "Alumno" || lastSegment === "Padre" || lastSegment === "Docente" ? "Inicio" : lastSegment);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-semibold">{getTitle()}</h2>
      <h2 className="text-md">{fechaActual}</h2>
    </div>
  );
}
