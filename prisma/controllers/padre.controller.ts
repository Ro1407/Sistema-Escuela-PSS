import { Request, Response } from 'express'
import * as padreService from '../services/padre.service'

export async function createPadre(req: Request, res: Response) {
    try {
        const padre = await padreService.createPadre(req.body)
        res.status(201).json(padre)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating padre' })
    }
}

export async function getPadre(req: Request, res: Response) {
    try {
        const padre = await padreService.getPadre(req.params.id)
        if (padre) {
            res.json(padre)
        } else {
            res.status(404).json({ error: 'Padre not found' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving padre' })
    }
}

export async function updatePadre(req: Request, res: Response) {
    try {
        const padre = await padreService.updatePadre(req.params.id, req.body);
        res.json(padre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating alumno' });
    }
}

export async function deletePadre(req: Request, res: Response) {
    try {
        await padreService.deletePadre(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting alumno' });
    }
}