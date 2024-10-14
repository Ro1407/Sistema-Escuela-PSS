import { Request, Response } from 'express';
import * as cursoService from '../services/curso.service';

export async function getCurso(req: Request, res: Response) {
	try {
			const curso = await cursoService.getCursoByID(req.params.id);
			if (curso) {
					res.json(curso);
			} else {
					res.status(404).json({ error: 'Curso not found' });
			}
	} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error retrieving curso' });
	}
}