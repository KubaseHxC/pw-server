import { Router } from 'express';

import * as PackageController from '../controller/package.controller';

const router = Router();
router.post('/package', PackageController.calculate);
export { router as PackageRouter };
