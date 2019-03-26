import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'PW_INGREDIENTS' })
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'dough' | 'simple';

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  multiplicity: number;
}
