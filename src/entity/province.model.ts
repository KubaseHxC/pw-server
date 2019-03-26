import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './country.model';

@Entity({name: 'PW_PROVINCE'})
export class Province {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string

    @Column({nullable: true})
    additionalTax?: number;

    @ManyToOne(type => Country, country => country.provinces)
    country: Country;
}
