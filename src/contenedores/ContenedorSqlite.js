import knex from 'knex'
import { asPOJO } from '../utils/objectUtils.js'

class ContenedorSQL {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }
    async listar(id) {
        try {
          return this.connection(this.table).where("id", id).select("*")
        } catch (error) {
        console.log(error);
        }
      }
    
      async listarAll() {
        try {
          return this.connection.from(this.table).select('*')
        } catch (error) {
          console.log(error);
        }
      }
    
      async save(item) {
        try {
          const ids = await this.connection(this.table).insert(item)
          return ids
        } catch (error) {
          console.log(error)
        } 
      }
    
      async update(prod, id) {
        try {
          const dbid = await this.connection.from(this.table).where("id", id).update({prod})
          return dbid
        } catch (error) {
          console.log(error)
        }
      }
    
      async deleteById(id) {
        try {
            return this.connection(this.table).where("id", id).del()
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContenedorSQL