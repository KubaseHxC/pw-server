import { Router } from 'express';

import * as IngredientsController from '../controller/ingredients.controller';

const router = Router();
router.get('/ingredients', IngredientsController.all);
export { router as IngredientController };
