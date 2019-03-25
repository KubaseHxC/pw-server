import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { router } from './routes/ingredients.routes';

createConnection()
    .then(async connection => {
        // create express app
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        // register express routes from defined application routes
        /*IngredientsRoutes.forEach(route => {
            (app as any)[route.method](
                route.route,
                (req: Request, res: Response, next: Function) => {
                    const result = new (route.controller as any)()[
                        route.action
                    ](req, res, next);
                    if (result instanceof Promise) {
                        result
                            .then(result =>
                                result !== null && result !== undefined
                                    ? res.send(result)
                                    : undefined
                            )
                            .catch(err => res.status(500).send(err.message))
                    } else if (result !== null && result !== undefined) {
                        res.json(result);
                    }
                }
            );
        });*/
        app.use(router);
        app.listen(3001);

        console.log('Express server has started on port 3001.');
    })
    .catch(error => console.log(error));
