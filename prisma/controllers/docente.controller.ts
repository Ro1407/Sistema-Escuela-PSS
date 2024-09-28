import { Request, Response } from 'express';
import * as docenteService from '../services/docente.service';

export async function createDocente(req: Request, res: Response) {
    try {
        const docente = await docenteService.createDocente(req.body);
        res.status(201).json(docente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating docente' });
    }
}

export async function getDocente(req: Request, res: Response) {
    try {
        const docente = await docenteService.getDocente(req.params.id);
        if (docente) {
            res.json(docente);
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving docente' });
    }
}

export async function getAllDocentes(req: Request, res: Response) {
    try {
        const docentes = await docenteService.getAllDocentes();
        res.json(docentes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving all docentes' });
    }
}

export async function updateDocente(req: Request, res: Response) {
    try {
        const docente = await docenteService.updateDocente(req.params.id, req.body);
        res.json(docente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating docente' });
    }
}

export async function deleteDocente(req: Request, res: Response) {
    try {
        await docenteService.deleteDocente(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting docente' });
    }
}