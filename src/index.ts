import colors from "colors"
import server from "./server"

const port = process.env.PORT || 4000

server.listen(port, ()=> {
    console.log(colors.blue.bold(`Servidor funcionando en el puerto: ${port}`))
})




//typeScript


let productName = "Tablet"
let isAuth = false
let price = 30


//type forma de sentencia
type Product = {
    id: number
    price: number
    name: string
}

//interface forma de sentencia

// interface Product {
//     id: number
//     price: number
//     name: string
// }

//Herencia con interfaces

// interface FullProduct extends Product{
//     image:string
// }

//Herencia con types
type FullProduct = Product &{
    image:string
}

interface ProductID {
    id: Product["id"]
}

let product3 : ProductID = {
    id:1

}

let product : Product = {
    id:1,
    price:30,
    name:"tablet"
}

let product2 : FullProduct = {
    id:2,
    price:30,
    name:"tablet 11 Pulgadas",
    image:"product.jpg"
}



const numbers = [10, 20, 30]