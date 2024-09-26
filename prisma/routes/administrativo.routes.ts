import express from 'express'
import * as administrativoController from '../controllers/administrativo.controller'

const router = express.Router()

router.post('/', administrativoController.createAdministrativo)
router.get('/:id', administrativoController.getAdministrativo)
router.put('/:id', administrativoController.updateAdministrativo)
router.delete('/:id', administrativoController.deleteAdministrativo)

export default router