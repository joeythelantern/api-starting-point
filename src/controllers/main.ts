import { NextFunction, Request, Response } from 'express';
import { routes } from '../config/routing';
import { Controller } from '../decorators/routing/controller';
import { Route } from '../decorators/routing/route';

@Controller(routes.main)
class MainController {
    @Route('get', '/healthcheck')
    healthcheck(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ hello: 'world!' });
    }
}

export default MainController;
