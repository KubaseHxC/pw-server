import { Router } from 'express';
import * as ProvinceController from '../controller/provinces.controller';

const router = Router();
router.put('./provinces/:id', ProvinceController.update);

export { router as ProvincesRouter };
