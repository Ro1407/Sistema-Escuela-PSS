import express from 'express'
import * as materiaController from '../controllers/materia.controller'

const router = express.Router()

router.post('/', materiaController.createMateria)
router.get('/:id', materiaController.getMateria)
router.put('/:id', materiaController.updateMateria)
router.delete('/:id', materiaController.deleteMateria)

export default router