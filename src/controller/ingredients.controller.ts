import { getRepository } from 'typeorm';
import { Ingredient } from '../entity/ingredient.model';
import { Request, Response, NextFunction } from 'express';

const all = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const ingredients = await getRepository(Ingredient).find();
  console.log(ingredients);
  response.send(ingredients);
};

export { all };
