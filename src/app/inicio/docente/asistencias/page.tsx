import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function InicioDocenteAsistenciasPage() {
  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-col">
        <PanelFecha title="Fecha Inicio" />
        <PanelFecha title="Fecha Fin" />
      </div>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      </ScrollArea>

    </div>
  )
}

function PanelFecha({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center p-2 mx-2 my-6 rounded-lg shadow-md">
      <h3 className="mb-2"> {title} </h3>
      <DatePicker />
      <Button variant="outline" className="my-2">Modificar</Button>
    </div>
  );
}
