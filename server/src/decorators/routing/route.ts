import { RequestHandler } from 'express';
import { RequestType } from '../../library/routing';

export function Route(method: RequestType, path: string = '', ...middleware: RequestHandler[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const routePath = `${path}`;
        const routeHandlers: Map<RequestType, Map<string, RequestHandler[]>> = Reflect.getMetadata('routeHandlers', target) || new Map();

        if (!routeHandlers.has(method)) {
            routeHandlers.set(method, new Map());
        }

        routeHandlers.get(method)?.set(routePath, [...middleware, descriptor.value]);

        Reflect.defineMetadata('routeHandlers', routeHandlers, target);
    };
}
