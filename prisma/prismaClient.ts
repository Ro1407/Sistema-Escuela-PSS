import { PrismaClient } from '@prisma/client'
import * as administrativoService from '../prisma/services/administrativo.service';
import * as alumnoService from '../prisma/services/alumno.service';
import * as docenteService from '../prisma/services/docente.service';
import * as materiaService from '../prisma/services/materia.service';
import * as padreService from '../prisma/services/padre.service';

const prisma = new PrismaClient()

async function main() {
    // Mostrar todos los administrativos para verificar el cambio
    // Crear un nuevo docente

    /*const nuevoDocente = await docenteService.createDocente({
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12738910',
        direccion: 'Calle Falsa 123',
        matricula: 'DOC1234',
        numeroTelefono: '123456789',
        correoElectronico: 'juan.perez@example.com',
        usuario: {
            usuario: 'juanperez',
            password: 'password123',
        },
        materiaId: 'ccbe4138-7a7b-41ad-be44-4888c6d6bb43',
    });
    console.log('Nuevo docente creado:', nuevoDocente);

    // Obtener un docente por ID
    const docente = await docenteService.getDocente(nuevoDocente.id);
    console.log('Docente encontrado:', docente);

    // Obtener todos los docentes
    const todosLosDocentes = await docenteService.getAllDocentes();
    console.log('Lista de todos los docentes:', todosLosDocentes);

    // Actualizar un docente
    const docenteActualizado = await docenteService.updateDocente(nuevoDocente.id, {
        apellido: 'Gómez',
        usuario: {
            password: 'nuevaPassword456',
        },
    });
    console.log('Docente actualizado:', docenteActualizado);

    // Obtener el docente actualizado
    const docenteDespuesActualizacion = await docenteService.getDocente(nuevoDocente.id);
    console.log('Docente después de la actualización:', docenteDespuesActualizacion);
*/

    /*

    const alumno = await alumnoService.createAlumno({
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12738910',
        numeroMatricula: '1326',
        direccion: 'Calle Falsa 123',
        telefono: '123456789',
        correoElectronico: 'juan2.perez@example.com',
        cursoId: 'c0b40a20-8d41-464b-9cd9-01f52005e3a3',
        usuario: {
            usuario: 'juan2',
            password: 'password123',
        },
    });
    console.log('Nuevo alumno creado:', alumno);


    const alumno2 = await alumnoService.getAlumno(alumno.id);
    console.log('Alumno encontrado:', alumno2);

    const todosLosAlumnos = await alumnoService.getAllAlumnos();
    console.log('Lista de todos los alumnos:', todosLosAlumnos);

    const alumnoActualizado = await alumnoService.updateAlumno(alumno.id, {
        apellido: 'Gómez',
        usuario: {
            password: 'nuevaPassword456',
        },
    });
    console.log('Alumno actualizado:', alumnoActualizado);

    const alumnoDespuesActualizacion = await alumnoService.getAlumno(alumnoActualizado.id);
    console.log('Alumno después de la actualización:', alumnoDespuesActualizacion); */

    /*
    const materia = await materiaService.createMateria({
        nombre: 'Matemáticas',
        docenteId: '8a931ccb-6b76-4238-9002-9e2804f09bf4',
        cursosIds: ['c0b40a20-8d41-464b-9cd9-01f52005e3a3'],
    });
    console.log('Nueva materia creada:', materia);

    const materia2 = await materiaService.getMateria(materia.id);

    console.log('Materia encontrada:', materia2);

    const todasLasMaterias = await materiaService.getAllMaterias();
    console.log('Lista de todas las materias:', todasLasMaterias);
    */

    /*
    const docenteSinMateria = await docenteService.createDocente({
        nombre: 'Pablo',
        apellido: 'Rodríguez',
        dni: '0101010101',
        direccion: 'Calle',
        matricula: 'MAT1234',
        numeroTelefono: '12340089',
        correoElectronico: 'pablo@gmail.com',
        usuario: {
            usuario: 'pablo',
            password: 'password'},
        materiaId: 'ccbe4138-7a7b-41ad-be44-4888c6d6bb43',
        }); */

    //TODO VOLVER A TESTEAR ESTEEEEE
    /*
    const materiaActualizada = await materiaService.updateMateria('629dc67b-409c-48b0-97b3-dfd2ed6f9c6e', {
        docenteId: 'ff0692c-68e1-463f-9a91-6a52171abcbb',
    });
    console.log('Materia actualizada:', materiaActualizada);

    const materiaDespuesActualizacion = await materiaService.getMateria(materiaActualizada.id);
    */

    /*
    const padre = await padreService.createPadre({
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12738000',
        direccion: 'Calle Falsa 123',
        numeroTelefono: '123456789',
        correoElectronico: 'padre@hotmail.com',
        usuario: {
            usuario: 'aaa',
            password: 'password'
        },
        hijosIds: ['f02de446-0740-4504-9ef5-f543b766bb1b', 'b22ac57f-cd63-4529-b6be-821e598233f2']
    });
    console.log('Nuevo padre creado:', padre);

    const padre2 = await padreService.getPadre(padre.id);
    console.log('Padre encontrado:', padre2);

    const todosLosPadres = await padreService.getAllPadres();
    console.log('Lista de todos los padres:', todosLosPadres);

    const padreActualizado = await padreService.updatePadre(padre.id, {
        apellido: 'Gómez',
        usuario: { password: 'aaa'} });

    console.log('Padre actualizado:', padreActualizado);
    */

    const administrativo = await administrativoService.createAdministrativo({
        nombre: 'Ana',
        apellido: 'López',
        dni: '12738700',
        direccion: 'Calle Falsa 123',
        numeroTelefono: '123456789',
        correoElectronico: 'ana@gmail.com',
        usuario: {
            usuario: 'ana',
            password: 'password'
        }
    });
    console.log('Nuevo administrativo creado:', administrativo);

    const administrativo2 = await administrativoService.getAdministrativo(administrativo.id);
    console.log('Administrativo encontrado:', administrativo2);

    const todosLosAdministrativos = await administrativoService.getAllAdministrativos();
    console.log('Lista de todos los administrativos:', todosLosAdministrativos);

    const administrativoActualizado = await administrativoService.updateAdministrativo(administrativo.id, {
        apellido: 'Gómez',
        usuario: { password: 'nuevaPassword456' }});
    console.log('Administrativo actualizado:', administrativoActualizado);
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

