import { Request, Response } from 'express';
import * as alumnoService from '../services/alumno.service';

export async function createAlumno(req: Request, res: Response) {
    try {
        const { fechaNacimiento, ...rest } = req.body;
        const alumno = await alumnoService.createAlumno({
            ...rest,
            fechaNacimiento: new Date(fechaNacimiento),
        });
        res.status(201).json(alumno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating alumno' });
    }
}

export async function getAlumno(req: Request, res: Response) {
    try {
        const alumno = await alumnoService.getAlumno(req.params.id);
        if (alumno) {
            res.json(alumno);
        } else {
            res.status(404).json({ error: 'Alumno not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving alumno' });
    }
}

export async function updateAlumno(req: Request, res: Response) {
    try {
        const alumno = await alumnoService.updateAlumno(req.params.id, req.body);
        res.json(alumno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating alumno' });
    }
}

export async function deleteAlumno(req: Request, res: Response) {
    try {
        await alumnoService.deleteAlumno(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting alumno' });
    }
}