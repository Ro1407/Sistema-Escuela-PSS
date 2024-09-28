import { Request, Response } from 'express';
import * as administrativoService from '../services/administrativo.service';

export async function createAdministrativo(req: Request, res: Response) {
    try {
        const administrativo = await administrativoService.createAdministrativo(req.body);
        res.status(201).json(administrativo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating administrativo' });
    }
}

export async function getAdministrativo(req: Request, res: Response) {
    try {
        const administrativo = await administrativoService.getAdministrativo(req.params.id);
        if (administrativo) {
            res.json(administrativo);
        } else {
            res.status(404).json({ error: 'Administrativo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving administrativo' });
    }
}

export async function getAllAdministrativos(req: Request, res: Response) {
    try {
        const administrativos = await administrativoService.getAllAdministrativos();
        res.json(administrativos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving all administrativos' });
    }
}

export async function updateAdministrativo(req: Request, res: Response) {
    try {
        const administrativo = await administrativoService.updateAdministrativo(req.params.id, req.body);
        res.json(administrativo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating administrativo' });
    }
}

export async function deleteAdministrativo(req: Request, res: Response) {
    try {
        await administrativoService.deleteAdministrativo(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting administrativo' });
    }
}