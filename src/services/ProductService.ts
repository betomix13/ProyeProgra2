import { getCustomRepository } from "typeorm";
import { Categorias } from "../entities/Category";
import { Products } from "../entities/Product";
import { ProductsRepository } from "../repositories/ProductsRepository"

interface IProduct {
    id?:string
    nombre:string;
    marca:string;
    precio:number;
    id_category: string;
  }


class ProductService {

  async create({ nombre, marca, precio, id_category }: IProduct) {
    if (!nombre || !marca || !precio || !id_category) {
      throw new Error("Por favor rellene todos los campos.");
    }

    const productsRepository = getCustomRepository(ProductsRepository);

    const productnameAlreadyExists = await productsRepository.findOne({ nombre });

    if (productnameAlreadyExists) {
      throw new Error("El producto ya ha sido creado");
    }

    const newProduct = new Products()
    newProduct.nombre = nombre
    newProduct.marca = marca
    newProduct.precio = precio
    newProduct.id_category = id_category


    await productsRepository.save(newProduct);

    return newProduct;

  }

  async delete(id: string) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where("id = :id", { id })
      .execute();

    return product;

  }

  async getData(id: string) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    return product;
  }

  async list() {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find({relations:["category"]});

    return products;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })
      .orWhere("marca like :search", { search: `%${search}%` })
      .orWhere("precio like :search", { search: `%${search}%` })
      
      .getMany();

    return product;

  }

  async update({ id,nombre, marca, precio, id_category }: IProduct) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository
      .createQueryBuilder()
      .update(Products)
      .set({ nombre, marca, precio, id_category })
      .where("id = :id", { id })
      .execute();

    return product;

  }
}

export { ProductService };