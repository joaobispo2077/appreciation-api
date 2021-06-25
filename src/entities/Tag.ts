import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Expose } from 'class-transformer';

@Entity('tags')
class Tag {
  @PrimaryColumn()
  id: string;

  @Column({ primary: true  })
  name: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @Expose({ name: 'nameCustom'})
  nameCustom(): string {
    return `#${this.name}`
  };

  constructor() {
    if(!this.id) this.id = uuid();
  }
}

export { Tag };