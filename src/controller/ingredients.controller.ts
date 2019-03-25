import { getRepository } from 'typeorm';
import { Ingredient } from '../entity/ingredient.model';
import { Request, Response, NextFunction } from 'express';

export class IngredientsController {
    private repository = getRepository(Ingredient);

    static async all(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Ingredient[]> {
        const ingredients = await getRepository(Ingredient).find();
        console.log(ingredients);
        return ingredients;
    }

    async one(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Ingredient> {
        return this.repository.findOne(request.params.id);
    }

    static async save(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Ingredient> {
        console.log(request);
        return getRepository(Ingredient).save(request.body);
    }

    async remove(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Ingredient> {
        let oldIngredient = await this.repository.findOne(request.params.id);
        return await this.repository.remove(oldIngredient);
    }
}
