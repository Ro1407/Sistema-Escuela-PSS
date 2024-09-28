import express from 'express'
import * as administrativoController from '../controllers/administrativo.controller'

const router = express.Router()

router.get('/', administrativoController.getAllAdministrativos)
router.get('/:id', administrativoController.getAdministrativo)
router.post('/', administrativoController.createAdministrativo)
router.put('/:id', administrativoController.updateAdministrativo)
router.delete('/:id', administrativoController.deleteAdministrativo)

export default router