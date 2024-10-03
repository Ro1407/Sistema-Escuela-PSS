import { Request, Response } from 'express';
import * as materiaService from '../services/materia.service';

export async function createMateria(req: Request, res: Response) {
    try {
        const materia = await materiaService.createMateria(req.body);
        res.status(201).json(materia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating materia' });
    }
}

export async function getMateria(req: Request, res: Response) {
    try {
        const materia = await materiaService.getMateria(req.params.id);
        if (materia) {
            res.json(materia);
        } else {
            res.status(404).json({ error: 'Materia not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving materia' });
    }
}

export async function getAllMaterias(req: Request, res: Response) {
    try {
        const materias = await materiaService.getAllMaterias();
        res.json(materias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving all materias' });
    }
}

export async function updateMateria(req: Request, res: Response) {
    try {
        const materia = await materiaService.updateMateria(req.params.id, req.body);
        res.json(materia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating materia' });
    }
}

export async function deleteMateria(req: Request, res: Response) {
    try {
        await materiaService.deleteMateria(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting materia' });
    }
}