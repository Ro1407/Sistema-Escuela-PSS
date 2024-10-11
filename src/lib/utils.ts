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

export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD') // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Quitar los acentos
    .replace(/[^a-zA-Z0-9\s]/g, '') // Opcional: quitar caracteres no alfanuméricos
    .trim(); // Quitar espacios en blanco
}

export function capitalizeInitials(str: string) {
  return str
    .toLowerCase() // Asegurar que todo el texto esté en minúsculas
    .split(' ') // Dividir la cadena en palabras por los espacios
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
    .join(' '); // Volver a unir las palabras con espacios
}

