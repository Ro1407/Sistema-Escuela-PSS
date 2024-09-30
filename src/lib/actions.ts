'use server'

import { PrismaClient } from '@prisma/client'

export type AuthState = {
  error: string | null;
  redirectPath: string | null;
};

const prisma = new PrismaClient()

export async function validateUser(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const user = await prisma.usuario.findUnique({
      where: { usuario: username },
      include: { padre: true, alumno: true, docente: true, administrativo: true },
    });

    if (!user) {
      return { error: 'El usuario ingresado no está registrado', redirectPath: null };
    }

    if (user.password !== password) {
      return { error: 'La contraseña ingresada no se corresponde con el usuario', redirectPath: null };
    }

    let redirectPath = '';
    if (user.padre) redirectPath = '/inicio/padre';
    else if (user.alumno) redirectPath = '/inicio/alumno';
    else if (user.docente) redirectPath = '/inicio/docente';
    else if (user.administrativo) redirectPath = '/inicio/admin';
    else {
      return { error: 'User type not recognized', redirectPath: null };
    }

    return { error: null, redirectPath };
  } catch (error) {
    console.error('Error validating user:', error);
    return { error: 'Ocurrió un error durante la validación', redirectPath: null };
  } finally {
    await prisma.$disconnect();
  }
}
