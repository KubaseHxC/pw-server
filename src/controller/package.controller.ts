import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Country } from '../entity/country.model';
import { Province } from '../entity/province.model';
import { Ingredient } from '../entity/ingredient.model';
import { Package } from '../entity/package.model';

const calculate = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const pizzaPackage = req.body as Package;
    let countryTax, provinceTax, ingredientsAmount;
    try {
        countryTax = await getCountryTax(pizzaPackage.country);
        provinceTax = await getProvinceTax(pizzaPackage.province);

        ingredientsAmount = await calculateIngredientsBeforeTax(
            pizzaPackage.ingredients
        );
        console.log('Ingredients amount before tax is ', ingredientsAmount);
    } catch (err) {
        console.log(err);
        res.send(err.message);
        return;
    }

    if (ingredientsAmount === 0) {
        res.send('0');
    }

    const finalPrice: number =
        ingredientsAmount +
        (ingredientsAmount / 100) * countryTax +
        (ingredientsAmount / 100) * provinceTax;

    res.send(finalPrice.toFixed(2));
};

const getCountryTax = async (countryId: number): Promise<number> => {
    const countryRepository = getRepository(Country);
    try {
        console.log('Looking for country with id ' + countryId);
        const country = await countryRepository.findOne(countryId);
        if (country) {
            console.log('Country was found ', country);
            return country.tax;
        }
        console.log('Country wasn`t found!');
        return null;
    } catch (err) {
        throw new Error(err);
    }
};

const getProvinceTax = async (provinceId: number): Promise<number> => {
    const provinceRepository = getRepository(Province);
    try {
        console.log('Looking for province with id ' + provinceId);
        const province = await provinceRepository.findOne(provinceId);
        if (province) {
            console.log('Province was found ', province);
            return province.additionalTax || 0;
        }
        console.log('Province wasn`t found!');
        return null;
    } catch (err) {
        throw new Error(err);
    }
};

const calculateIngredientsBeforeTax = async (
    packageIngredients: { quantity: number; id: number }[]
): Promise<number> => {
    const ingredientsRepository = getRepository(Ingredient);
    const ingredientsIds = packageIngredients.map(i => i.id);
    const getQuantity = (id: number) => {
        const coincidence = packageIngredients.find(i => i.id === id);
        return coincidence ? coincidence.quantity || 1 : 0;
    };
    try {
        const ingredients: Ingredient[] = await ingredientsRepository.findByIds(
            ingredientsIds
        );
        if (ingredients) {
            return ingredients.reduce(
                (prev, curr) => prev + curr.price * getQuantity(curr.id),
                0
            );
        }
        return 0;
    } catch (err) {
        throw new Error(err);
    }
};

export { calculate };
