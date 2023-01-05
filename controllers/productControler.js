import fs from "fs"
import { options } from "../src/mysqlDB.js";
const knexConnection = knex(options)
import knex from "knex";

export default class ProductControler {
    constructor(table) {
      this.table = table;
    }
  async list(id) {
    try {
      return knexConnection(this.table).where("id", id).select("*")
    } catch (error) {
    console.log(error);
    }
  }

  async listAll() {
    try {
      return knexConnection.from(this.table).select('*')
    } catch (error) {
      console.log(error);
    }
  }

  async save(product) {
    const products = await this.listAll();

    try {
      let id;
      products.length === 0
        ? (id = 1)
        : (id = products[products.length - 1].id + 1);
      const newProduct = { ...product, id };
      products.push(newProduct);
      await this.writeFile(products);
      return newProduct.id;
    } catch (error) {
      console.log(error);
    }
  }

  async update(prod, id) {
    const products = await this.listAll();
    try {
      const updatedProduct = products.find(
        (product) => product.id === parseInt(id)
      );
      if (updatedProduct) {
        const prods = products.filter((product) => product.id !== parseInt(id));
        prods.push({ ...prod, id: parseInt(id) });
        await this.writeFile(prods);
        return updatedProduct;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    const products = await this.listAll();
    try {
      const newProducts = products.filter((prod) => prod.id !== id);
      await this.writeFile(newProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await this.writeFile([]);
  }

  async writeFile(data) {
    try {
      await fs.promises.writeFile(this.table, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}
