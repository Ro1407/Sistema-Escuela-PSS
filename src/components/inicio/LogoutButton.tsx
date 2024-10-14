'use client'

import { logout } from "@/lib/actions"
import { Button } from "../ui/button"

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="cursor-pointer border-none w-full"
      >
        Cerrar Sesión
      </Button>
    </form>
  )

}

