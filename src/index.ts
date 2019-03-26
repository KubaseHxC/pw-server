import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { IngredientController } from './routes/ingredients.routes';
import { CountryController } from './routes/country.routes';

createConnection()
    .then(async connection => {
        const app = express();
      
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
      
        app.use(IngredientController);
        app.use(CountryController);
      
        app.listen(3001);

        console.log('Express server has started on port 3001.');
    })
    .catch(error => console.log(error));
