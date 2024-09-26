import express from 'express'
import * as alumnoController from '../controllers/alumno.controller'

const router = express.Router()

router.post('/', alumnoController.createAlumno)
router.get('/:id', alumnoController.getAlumno)
router.put('/:id', alumnoController.updateAlumno)
router.delete('/:id', alumnoController.deleteAlumno)

export default router