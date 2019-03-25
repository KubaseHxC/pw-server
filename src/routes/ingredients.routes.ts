import { Router } from 'express';

import { IngredientsController } from '../controller/ingredients.controller';

export const Routes = [
    {
        method: 'get',
        route: '/ingredients',
        controller: IngredientsController,
        action: 'all'
    },
    {
        method: 'get',
        route: '/ingredients/:id',
        controller: IngredientsController,
        action: 'one'
    },
    {
        method: 'post',
        route: '/ingredients',
        controller: IngredientsController,
        action: 'save'
    },
    {
        method: 'delete',
        route: '/ingredients/:id',
        controller: IngredientsController,
        action: 'remove'
    }
];

const router = Router();
router.post('/ingredients', IngredientsController.save);
router.get('/ingredients', IngredientsController.all);
export { router };
