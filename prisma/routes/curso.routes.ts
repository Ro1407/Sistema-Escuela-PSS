import express from 'express'
import * as cursoController from '../controllers/curso.controller'

const router = express.Router()

router.get('/:id', cursoController.getCurso)

export default router