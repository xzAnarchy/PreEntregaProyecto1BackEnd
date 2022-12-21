import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IO } from 'socket.io'
import ProductControler from '../controllers/productControler.js'

//--------------------------------------------
// instancio servidor, socket y api
const app = express()
const fileProducts = new ProductControler("products")
const fileMessages = new ProductControler("messages")

//--------------------------------------------
// configuro el socket mensajes y productos

const httpServer = new HttpServer(app)
const io = new IO(httpServer)

// const messages = [
//     { author: 'Pablo', text: 'Hola, que tal' },
//     { author: 'Marcelo', text: 'muy bien y tu?' },
//     { author: 'Belen', text: 'Hola!!' }
// ]
// const Products = [
//     { title: 'agua', price: 20, thumbnail: 'https://dummyimage.com/250/000/fff'}
// ]

io.on('connection', async (socket) => {
    console.log('nuevo cliente conectado');

    //Mensajes 
    const messages = await fileMessages.listAll();
    // Le envio el historial de el array que ya tengo cuando un nuevo cliente se conecte
    socket.emit('message', messages)
    // una vez escuchamos al cliente y recibimos un mensaje, realizamos el envio a todos los demas pusheandolo a un array
    socket.on('newMessage', async (data) => {
        await fileMessages.save(data);
        const newMessages = await fileMessages.listAll();
        // re enviamos por medio broadcast los msn a todos los clientes que esten conectados en ese momento
        io.sockets.emit('message', newMessages)
    })

    // productos
    const products = await fileProducts.listAll();
    // Le envio el historial de el array que ya tengo cuando un nuevo cliente se conecte
    socket.emit('Products', products)

    socket.on('newProduct', async (data) => {
        await fileProducts.save(data);
        const newProducts = await fileProducts.listAll();
        io.sockets.emit("Products", newProducts);
    })

})

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))