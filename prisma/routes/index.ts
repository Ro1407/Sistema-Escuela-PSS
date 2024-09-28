import express from 'express'
import padreRoutes from './padre.routes'
import alumnoRoutes from './alumno.routes'
import docenteRoutes from './docente.routes'
import administrativoRoutes from './administrativo.routes'
import materiaRoutes from './materia.routes'

const router = express.Router()

router.use('/padres', padreRoutes)
router.use('/alumnos', alumnoRoutes)
router.use('/docentes', docenteRoutes)
router.use('/administrativos', administrativoRoutes)
router.use('/materias', materiaRoutes)

router.get('/hw', (req, res) => {
    res.send('Hello World!')
})

export default router