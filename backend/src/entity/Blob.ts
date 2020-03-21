import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Blob {
  @PrimaryColumn()
  public key!: string;

  @Column()
  public data!: string;
}
