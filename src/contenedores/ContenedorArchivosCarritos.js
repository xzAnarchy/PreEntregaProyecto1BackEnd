const { promises: fs } = require('fs')

class ContenedorArchivosCarritos {

    constructor(path) {
        this.path = path;
    }

    async getAll (req, res){
        try {
            const all = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(all)
        } catch (error) {
            const errorMsg = 'no se encontraron resultados'
            return errorMsg
        }
    }

    async getById(id){
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);
            const obj = data.find(obj => obj.id === id);

            if(!obj){
                return null;
            } else {return obj};
        } catch (error) {
            console.log(error);
        }
    }

    async postNewCart(obj){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            data.push(obj)
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return console.log(obj.id) 
        } catch (error) {
            errorMsg = "no se pudo crear el carrito"
            return (errorMsg)
        }
    }

    async saveObjInCart(prod, id){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            const obj = data.find (obj => obj.id === id)

            obj.cart.push(prod)

            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return console.log(obj.id) 
        } catch (error) {
            errorMsg = "no se pudo agregar al carrito"
            return (errorMsg)
        }
    }

    async deleteCart(id){
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);

            const newData = data.filter(element => element.id != id);
            await fs.writeFile(this.path, JSON.stringify(newData, null, 2), 'utf-8');

            return newData;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteObjInCart(idCart, idProduct){
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            let data = JSON.parse(read);

            let cart = data.find(element => idCart === element.id);
            const newProducts = cart.products.filter(element => element.id != idProduct);
            cart.products = newProducts;

            const filteredElements = data.filter(element => element.id !== idCart);
            data = [...filteredElements, cart];

            await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');

            return cart;
        } catch (error) {
            console.log(error);
        } 
    }

    async update(element, id) {
            try {
                const read = await fs.readFile(this.path, 'utf-8');
                let data = JSON.parse(read);

                let cart = data.find(element => id === element.id);
                cart.products.push(element);

                const filteredElements = data.filter(element => element.id !== id);
                data = [...filteredElements, cart];
                    
                await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');

                return cart.products;
            } catch (error) {
                console.log(error);
            } 
        }    
}

module.exports = ContenedorArchivosCarritos;