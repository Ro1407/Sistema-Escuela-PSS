import express from 'express'
import * as padreController from '../controllers/padre.controller'

const router = express.Router()

router.get('/', padreController.getAllPadres)
router.get('/:id', padreController.getPadre)
router.post('/', padreController.createPadre)
router.put('/:id', padreController.updatePadre)
router.delete('/:id', padreController.deletePadre)

export default router