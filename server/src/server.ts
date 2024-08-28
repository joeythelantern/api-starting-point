/** Imports */
import http from 'http';
import express from 'express';
import cors from 'cors';
import { server } from './config/config';
import './config/logging';
import 'reflect-metadata';

/** Middleware */
import { faviconHandler } from './middleware/faviconHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { defineRoutes } from './modules/routing';
import MainController from './controllers/main';

/**
 * Server class contains everything we need to start up our API.
 */
export class Server {
    /** Express Instance */
    application = express();

    /** Server Instance */
    server: ReturnType<typeof http.createServer> | undefined;

    /**
     * Start the server and listen
     */
    async start() {
        logging.log('----------------------------------------');
        logging.log('Initializing API');
        logging.log('----------------------------------------');
        this.application.use(express.urlencoded({ extended: true }));
        this.application.use(express.json());

        logging.log('----------------------------------------');
        logging.log('Logging & Configuration');
        logging.log('----------------------------------------');
        this.application.use(loggingHandler);
        this.application.use(
            cors({
                origin: '*',
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
                allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
                credentials: true,
                optionsSuccessStatus: 200
            })
        );
        this.application.use(faviconHandler);

        logging.log('----------------------------------------');
        logging.log('Define Controller Routing');
        logging.log('----------------------------------------');
        defineRoutes([MainController], this.application);

        logging.log('----------------------------------------');
        logging.log('Define Routing Error');
        logging.log('----------------------------------------');
        this.application.use(routeNotFound);

        logging.log('----------------------------------------');
        logging.log('Starting Server');
        logging.log('----------------------------------------');
        this.server = http.createServer(this.application);
        this.server.listen(server.SERVER_PORT, () => {
            logging.log('----------------------------------------');
            logging.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
            logging.log('----------------------------------------');
        });
    }

    /**
     * Shut down the api
     */
    async shutdown(callback?: any) {
        if (!this.server) return;

        this.server.close(callback);
    }
}

/** Turn it on! */
new Server().start();
