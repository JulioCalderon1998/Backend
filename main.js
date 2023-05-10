class ProductManager{
    constructor(){
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].code === code){
            console.log("Error - El codigo ya existe");
            return;
            }
        }

        ProductManager.id++
        this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id});
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        if(!this.products.find((product) => product.id === id)){
            console.log("Not Found")
        } else {
            console.log(this.products.find((product) => product.id === id))
        }
    }
}


const productos = new ProductManager();



productos.addProduct('Heladera', 'Heladera con freezer', 7500, 'img', 'ele101', 10);
productos.addProduct('Heladera2', 'Heladera con freezer2', 7500, 'img', 'ele102', 10);



console.log(productos.getProducts())


productos.getProductById(2);