import express from 'express'
import * as docenteController from '../controllers/docente.controller'

const router = express.Router()

router.post('/', docenteController.createDocente)
router.get('/:id', docenteController.getDocente)
router.put('/:id', docenteController.updateDocente)
router.delete('/:id', docenteController.deleteDocente)

export default router