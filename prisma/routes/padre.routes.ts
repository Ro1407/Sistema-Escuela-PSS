import express from 'express'
import * as padreController from '../controllers/padre.controller'

const router = express.Router()

router.post('/', padreController.createPadre)
router.get('/:id', padreController.getPadre)
router.put('/:id', padreController.updatePadre)
router.delete('/:id', padreController.deletePadre)

export default router