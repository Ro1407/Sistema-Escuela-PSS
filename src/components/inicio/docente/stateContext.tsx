"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'
import { Curso } from '../../../../prisma/interfaces'

type StateContextType = {
  cursoSeleccionado: Curso | undefined
  setCursoSeleccionado: (state: Curso | undefined) => void
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [sharedState, setSharedState] = useState<Curso | undefined>(undefined)

	useEffect(() => {
    console.log('Shared state updated:', sharedState)
  }, [sharedState])

  return (
    <StateContext.Provider value={{ cursoSeleccionado: sharedState, setCursoSeleccionado: setSharedState }}>
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