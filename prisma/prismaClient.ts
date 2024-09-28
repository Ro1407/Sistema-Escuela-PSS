import { PrismaClient } from '@prisma/client'
import * as administrativoService from '../prisma/services/administrativo.service';

const prisma = new PrismaClient()

async function main() {
    // Mostrar todos los administrativos para verificar el cambio
    const admins = await administrativoService.getAllAdministrativos();
    console.log('Lista de administrativos después de la actualización:', admins);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

