import express from 'express'
import * as alumnoController from '../controllers/alumno.controller'

const router = express.Router()

router.get('/', alumnoController.getAllAlumnos)
router.get('/:id', alumnoController.getAlumno)
router.post('/', alumnoController.createAlumno)
router.put('/:id', alumnoController.updateAlumno)
router.delete('/:id', alumnoController.deleteAlumno)

export default router