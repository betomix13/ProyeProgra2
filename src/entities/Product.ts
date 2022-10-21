import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Categorias } from "./Category";

@Entity("products")
class Products {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  precio: number;

  @Column()
  id_category: string;

  @ManyToOne(() => Categorias, categoria => categoria.productos)
  @JoinColumn({ name: 'id_category' })
  category: Categorias
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Products };