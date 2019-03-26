import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

import { Country } from '../entity/country.model';
import { Province } from '../entity/province.model';

const all = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Country);
  const countries = await repository.find({ relations: ['provinces'] });
  res.send(countries);
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const respository = getRepository(Country);
  try {
    const country = await respository.findOne(req.params.id);
    if (country) {
      const tax = (req.body as Country).tax;
      country.tax = tax;
      const result = await respository.save(country);
      res.send(result);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Country);
  try {
    console.log(req.body);
    const country = req.body as Country;
    if (country.provinces) {
      const provincesRepository = getRepository(Province);
      country.provinces = country.provinces.map(p =>
        provincesRepository.create(p)
      );
      const saveProvincesResult = await provincesRepository.save(
        country.provinces
      );
    }
    const repoCountry = repository.create(country);
    const result = await repository.save(country);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { all, create, update };
