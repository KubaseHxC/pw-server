import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Province } from '../entity/province.model';

const update = async (req: Request, res: Response, next: NextFunction) => {
    const repository = getRepository(Province);
    try {
        const province = await repository.findOne(req.params.id);
        if (province) {
            const additionalTax = (req.body as Province).additionalTax;
            province.additionalTax = additionalTax;
            const result = repository.save(province);
            res.send(result);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}