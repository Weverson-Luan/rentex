import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidV4} from "uuid";
import { Category } from './Category';
import { Specification } from './Specification';

@Entity("cars")
class Car {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  available: boolean;

  @ManyToOne(()=> Category)
  @JoinColumn({ name: "category_id"})
  category : Category; 

//e uma chave estrangeira, 
  @Column()
  category_id: string;

  @ManyToMany(()=> Specification)
  @JoinTable({
    name: "specifications_cars", //nome da table de relacionameno
    joinColumns: [{name: 'car_id'}], // nome da coluna dentro da tabela de relacionamento que referencia a tabela que estamos
    inverseJoinColumns: [{name: "specification_id"}], // nome que referencia a outra coluna que referencia a outra tabela que estamos colocando no ManyToMany
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at?: Date;

  constructor(){
    if(!this.id){
      this.id = uuidV4();
      this.available = true;
    }
    
  }
};

export { Car };