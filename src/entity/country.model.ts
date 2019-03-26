import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Province } from './province.model';

@Entity({name: 'PW_COUNTRY'})
export class Country {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string;

    @Column()
    code: number;

    @Column()
    tax: number;

    @OneToMany(type => Province, province => province.country)
    provinces: Province[]
}
