import { ToppingsController } from '../controller/topping.controller';

export const Routes = [
    {
        method: 'get',
        route: '/toppings',
        controller: ToppingsController,
        action: 'all'
    },
    {
        method: 'get',
        route: '/toppings/:id',
        controller: ToppingsController,
        action: 'one'
    },
    {
        method: 'post',
        route: '/toppings',
        controller: ToppingsController,
        action: 'save'
    },
    {
        method: 'delete',
        route: '/toppings/:id',
        controller: ToppingsController,
        action: 'remove'
    }
];
