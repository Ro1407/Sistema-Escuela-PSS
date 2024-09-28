import { PrismaClient } from '@prisma/client'
import * as administrativoService from '../prisma/services/administrativo.service';

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here
    const admins = await prisma.administrativo.findMany()
    console.log(admins)

    const admin2 = await prisma.administrativo.findUnique({ where: {  id: '5c026c53-a3f4-43dd-af33-45c1c356758a'} })
    console.log(admin2)

    const administrativo = await administrativoService.getAdministrativo('5c026c53-a3f4-43dd-af33-45c1c356758a');
    console.log(administrativo)
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

