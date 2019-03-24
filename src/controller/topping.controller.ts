import { getRepository } from 'typeorm';
import { Topping } from '../entity/topping.model';
import { Request, Response, NextFunction } from 'express';

export class ToppingsController {
    private repository = getRepository(Topping);

    async all(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<[Topping[], number]> {
        return this.repository.findAndCount();
    }

    async one(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Topping> {
        return this.repository.findOne(request.params.id);
    }

    async save(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Topping> {
        return this.repository.save(request.body);
    }

    async remove(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Topping> {
        let oldTopping = await this.repository.findOne(request.params.id);
        return await this.repository.remove(oldTopping);
    }
}
