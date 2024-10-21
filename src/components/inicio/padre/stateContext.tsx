"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'
import { Alumno } from '../../../../prisma/interfaces'

type StateContextType = {
  hijoSeleccionado: Alumno | undefined
  setHijoSeleccionado: (state: Alumno | undefined) => void
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [sharedState, setSharedState] = useState<Alumno | undefined>(undefined)

	useEffect(() => {
    console.log('Shared state updated:', sharedState)
  }, [sharedState])

  return (
    <StateContext.Provider value={{ hijoSeleccionado: sharedState, setHijoSeleccionado: setSharedState }}>
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider')
  }
  return context
}