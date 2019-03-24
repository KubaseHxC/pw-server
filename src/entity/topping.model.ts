import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'PW_TOPPING'})
export class Topping {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    type: 'dough' | 'simple';

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    multiplicity: Number;
}
