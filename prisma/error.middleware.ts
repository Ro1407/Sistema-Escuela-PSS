import { Request, Response, NextFunction } from 'express'

export default function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(`Error occurred during ${req.method} request to ${req.url}`);
    console.error(error.stack)

    if (res.headersSent) {
        return next(error);
    }

    res.status(500).json({ error: 'Something went wrong!' })
}