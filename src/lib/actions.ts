'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function validateUser(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    console.log('Connecting to the database...');
    const user = await prisma.usuario.findUnique({
      where: {
        usuario: username,
      },
      include: {
        padre: true,
        alumno: true,
        docente: true,
        administrativo: true,
      },
    })

    console.log(user?.usuario + " " + user?.rol);

    if (!user) {
      return { error: 'User not found' }
    }

    if (user.password !== password) {
      return { error: 'Invalid password' }
    }

    let redirectPath = ''
    if (user.padre) redirectPath = '/inicio/padre'
    else if (user.alumno) redirectPath = '/inicio/alumno'
    else if (user.docente) redirectPath = '/inicio/docente'
    else if (user.administrativo) redirectPath = '/inicio/admin'
    else {
      return { error: 'User type not recognized' }
    }
    
    console.log(redirectPath);
    
    redirect(redirectPath)
  } catch (error) {
    console.error('Error validating user:', error)
    return { error: 'An error occurred during validation' }
  } finally {
    await prisma.$disconnect()
  }
}