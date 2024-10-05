import { PrismaClient } from '@prisma/client'
import * as administrativoService from '../prisma/services/administrativo.service';
import * as alumnoService from '../prisma/services/alumno.service';
import * as docenteService from '../prisma/services/docente.service';
import * as materiaService from '../prisma/services/materia.service';
import * as padreService from '../prisma/services/padre.service';
import * as cursoService from '../prisma/services/curso.service';


const prisma = new PrismaClient()

async function main() {

    //NOTA: casos de creación van a dar error si se vuelven a correr, ya existen usuarios con ese usuario, mail, dni, etc.

  /*  await casosDocente()
    await casosAlumno()
    await casosMateria()
    await casosMateriasSinDocentes()
    await casosPadre()
    await casosAdministrativos() */
    //await casosInterfazCrearDocente()
    await casosInterfazCrearPadre()

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


async function casosDocente(){

    const nuevoDocente = await docenteService.createDocente({
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12738910',
        direccion: 'Calle Falsa 123',
        matricula: 'DOC1234',
        numeroTelefono: '123456789',
        correoElectronico: 'juan.perez@example.com',
        cursosIds: ['c0b40a20-8d41-464b-9cd9-01f52005e3a3'],
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
}


async function casosAlumno() {

    const alumno = await alumnoService.createAlumno({
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12738910',
        numeroMatricula: '1326',
        direccion: 'Calle Falsa 123',
        telefono: '123456789',
        correoElectronico: 'juan2.perez@example.com',
        cursoId: 'c0b40a20-8d41-464b-9cd9-01f52005e3a3',   //Se refleja correctamente en la relación de curso
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
    console.log('Alumno después de la actualización:', alumnoDespuesActualizacion);
}

async function casosMateria(){
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

    /* NOTA: No se puede cambiar docente porque en la entidad docente el campo materia es obligatorio y la
    relación es uno a uno.*/

    const materiaActualizada = await materiaService.updateMateria('629dc67b-409c-48b0-97b3-dfd2ed6f9c6e', {
        nombre: 'Historia',
    });
    console.log('Materia actualizada:', materiaActualizada);

    const materiaDespuesActualizacion = await materiaService.getMateria(materiaActualizada.id);
}

async function casosMateriasSinDocentes(){
    let cursos = ['c0b40a20-8d41-464b-9cd9-01f52005e3a3'];

    let materiasSinDocentes = await materiaService.getNombreIDMateriasSinDocente(cursos);
    console.log('Materias sin docente 1B (matemáticas):', materiasSinDocentes);

    cursos = ['c0b40a20-8d41-464b-9cd9-01f52005e3a3', 'e9647674-972a-4a97-8b92-0246b564e41a'];
    materiasSinDocentes = await materiaService.getNombreIDMateriasSinDocente(cursos);
    console.log('Materias sin docente 1B y 2A (ninguna):', materiasSinDocentes);

    cursos = ['c0b40a20-8d41-464b-9cd9-01f52005e3a3', 'bd69821a-9c6e-491b-bc32-3267f106f985'];
    materiasSinDocentes = await materiaService.getNombreIDMateriasSinDocente(cursos);
    console.log('Materias sin docente 1B y 1A (ciencias sociales):', materiasSinDocentes);

    cursos = ['c0b40a20-8d41-464b-9cd9-01f52005e3a3', 'bd69821a-9c6e-491b-bc32-3267f106f985', 'c024e385-4b94-4c6f-b3f8-54e78dcef89e', 'e9647674-972a-4a97-8b92-0246b564e41a'];
    materiasSinDocentes = await materiaService.getNombreIDMateriasSinDocente(cursos);
    console.log('Materias sin docente 1B, 1A, 2A y 2B (politica):', materiasSinDocentes); //politica y literatura antes de controlar interfaz, bien
}


async function casosPadre(){
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
}

async function casosAdministrativos(){
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


async function casosInterfazCrearDocente() {


    /* Usar cursoService.getAllCursosNombreID() para obtener nombre y ID de todos los cursos */
    const todosLosCursos = await cursoService.getAllCursosNombreID();
    console.log('Cursos:', todosLosCursos);

    /* Usar getNombreIDMateriasSinDocente(cursoIds: string[]) de materia service para obtener todas las materias que se le podrían asignar al docente en función de los cursos
    se chequea en la interfaz */

   const id_literatura = '487802c6-d201-4947-b449-df60b4dd1022';
   //Escenario: se eligen los cursos 1A, 1B, 2A y 2B con materia literatura

    /*
   const docenteConMateria = await docenteService.createDocente({
        nombre: 'Pablo',
        apellido: 'Rodríguez',
        dni: '0101010101',
        direccion: 'Calle',
        matricula: 'MAT1234',
        numeroTelefono: '12340089',
        correoElectronico: 'pablo@gmail.com',
        cursosIds: todosLosCursos.map(curso => curso.id),
        usuario: {
            usuario: 'pablo',
            password: 'password'},
        materiaId: id_literatura,
   });

    console.log('Docente creado:', docenteConMateria);

    const cursos = ['c0b40a20-8d41-464b-9cd9-01f52005e3a3', 'bd69821a-9c6e-491b-bc32-3267f106f985', 'c024e385-4b94-4c6f-b3f8-54e78dcef89e', 'e9647674-972a-4a97-8b92-0246b564e41a'];
    let materiasSinDocentes = await materiaService.getNombreIDMateriasSinDocente(cursos);
    console.log('Materias sin docente 1B, 1A, 2A y 2B (politica):', materiasSinDocentes);

    //NO SE ACTUALIZA LA RELACIÓN CURSO-DOCENTE ESTABA MAL EL SERVICIO. OTRA PRUEBA CON EL CAMBIO
*/

    //Escenario: se elige el curso 3A con materia naturales

    const id_naturales = '53310958-102b-40ea-9996-a00d987d8adf';
    const id_3A = 'f9af1024-f291-437d-b797-7d1c47330e03';

    const docente = await docenteService.createDocente({
        nombre: 'Maria',
        apellido: 'Cruz',
        dni: '0001010100',
        direccion: 'Calle',
        matricula: 'MAT1233',
        numeroTelefono: '12341189',
        correoElectronico: 'maria@gmail.com',
        cursosIds: [id_3A],
        usuario: {
            usuario: 'maria@gmail.com',
            password: 'password'},
        materiaId: id_naturales,
    });

    console.log('Docente creado:', docente);
   const  materiasSinDocentes = await materiaService.getNombreIDMateriasSinDocente([id_3A]);
    console.log('Materias sin docente 3A (ninguna, naturales se acaba de linkear):', materiasSinDocentes);

    //Todas las relaciones OK
}


async function casosInterfazCrearPadre(){
    let alumnosSinPadre = await alumnoService.getAlumnosSinPadre();
    console.log('Alumnos sin padre:', alumnosSinPadre);

    //Escenario: se tipea nombre, apellido o mail y se termina eligiendo Laura
    const padre = await padreService.createPadre({
        nombre: 'Mateo',
        apellido: 'Álvarez',
        dni: '12739000',
        direccion: 'Calle Falsa 123',
        numeroTelefono: '003456789',
        correoElectronico: 'mateo@hotmail.com',
        usuario: {
            usuario: 'mateo',
            password: 'password'
        },
        hijosIds: ['733adee2-fa05-456d-8084-a60a3423772f']
    });
    console.log('Nuevo padre creado:', padre);

    alumnosSinPadre = await alumnoService.getAlumnosSinPadre();
    console.log('Alumnos sin padre:', alumnosSinPadre);
}



