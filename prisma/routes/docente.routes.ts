import express from 'express'
import * as docenteController from '../controllers/docente.controller'

const router = express.Router()

router.get('/', docenteController.getAllDocentes)
router.get('/:id', docenteController.getDocente)
router.post('/', docenteController.createDocente)
router.put('/:id', docenteController.updateDocente)
router.delete('/:id', docenteController.deleteDocente)

export default router