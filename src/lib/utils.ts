import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatearFecha(fecha: Date) {
  const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11, así que se suma 1
  const año = fecha.getFullYear();
  // Construye la fecha en el formato dd/mm/aaaa
  const fechaFormateada = `${dia}/${mes}/${año}`;
  return fechaFormateada
}