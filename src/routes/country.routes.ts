import { Router } from 'express';

import * as CountriesController from '../controller/coutry.controller';

const router = Router();
router.get('/countries', CountriesController.all);
router.post('/countries', CountriesController.create);
router.put('/countries/:id', CountriesController.update);
export { router as CountryController };
