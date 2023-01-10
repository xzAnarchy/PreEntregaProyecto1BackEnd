import knex from 'knex'
import config from '../src/config.js'

// opciones SQL: mariaDb, sqlite3

const knexConnection = knex(config.sqlite3);

//------------------------------------------
    try {
        // _01
        console.log('Iniciando Script...');
        await knexConnection.schema.dropTableIfExists('productos')

        await knexConnection.schema.createTable('productos', table => {
            table.increments('id').primary()
            table.string('title', 30).notNullable()
            table.float('price').notNullable()
            table.string('description', 50).notNullable()
            table.string('thumbnail')
            table.float('stock').notNullable()
        })
        console.log('tabla productos creada con éxito')
    } catch (error) {
        console.log('error al crear tabla productos')
        console.log(error)
    }


//------------------------------------------
    try {
        await knexConnection.schema.dropTableIfExists('carritos')

        await knexConnection.schema.createTable('carritos', table => {
            table.increments('id').primary()
            table.integer('idCarrito').notNullable()
            table.float('timestamp')
            table.string('creationDate')
            table.string('usuario')
            table.boolean('deleted').defaultTo(false)
        })

        await knexConnection.schema.dropTableIfExists('prodsEnCarritos')

        await knexConnection.schema.createTable('prodsEnCarritos', table => {
            table.increments('id').primary()
            table.integer('idCarrito').notNullable()
            table.string('title', 30).notNullable()
            table.float('price').notNullable().notNullable()
            table.string('thumbnail', 1024)
            table.string('description', 50).notNullable()
            table.string('thumbnail', 1024)
            table.float('stock').notNullable()
        })
        console.log('tablas carritos creada con éxito')
    } catch (error) {
        console.log('error al crear tablas carritos')
    }

    await knexConnection.destroy()
