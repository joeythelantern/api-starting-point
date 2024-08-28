import { Request, Response, NextFunction } from 'express';

export function faviconHandler(req: Request, res: Response, next: NextFunction) {
    if (req.url.includes('/favicon.ico')) return res.sendStatus(200);

    next();
}
