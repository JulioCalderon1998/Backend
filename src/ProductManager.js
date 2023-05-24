const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path
  };

  static id = 0
  
  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products)
    } catch(error) {
      console.log("Archivo no existente, creando...")
      await fs.promises.writeFile(this.path, "[]").catch(err => console.log(err));
      return []
    }
  };

  async getProductById(id){
    try{
    const products = await this.getProducts();
    const findProduct = products.find(product => product.id === id)

    if(findProduct) {
     return findProduct
    } else {
        return "Error - Producto no encontrado!"
    }
   } catch (error) {
    console.log(error)
   }
}

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if(!title || !description || !price || !thumbnail || !code || !stock) return "Error - Faltan campos obligatorios!"
      const allProducts = await this.getProducts();
      const findCode = allProducts.find(product => product?.code === code)
      if(findCode) return "Error - El Codigo ya existe!"

      ProductManager.id++
      allProducts.push({ title, description, price, thumbnail, code, stock, id: ProductManager.id})

      const productStr = JSON.stringify(allProducts, null, 2)
      await fs.promises.writeFile(this.path, productStr)
      return "Producto añadido con éxito!"

    } catch (error) {
      console.log(error)
    }
  };


  async updateProduct(id,update) {
    try {
        const product = await this.getProductById(id);
        if (!product) return "Error - El producto a modificar no existe!";
    
        const updatedProduct = {
          ...product,
          ...update
        };
    
        const allProducts = await this.getProducts();
        const productIndex = allProducts.findIndex((p) => p.id === id);
    
        if (productIndex === -1) return "Error - El producto a modificar no existe!";
    
        allProducts[productIndex] = updatedProduct;
    
        const productStr = JSON.stringify(allProducts, null, 2);
        await fs.promises.writeFile(this.path, productStr);
        return "Producto actualizado con éxito!";
      } catch (error) {
        console.log(error);
      }
      }


  async deleteProduct(id) {
        try {
          const allProducts = await this.getProducts();
          const productIndex = allProducts.findIndex((p) => p.id === id);
      
          if (productIndex === -1) return "Error - El producto a eliminar no existe!";
      
          allProducts.splice(productIndex, 1);
      
          const productStr = JSON.stringify(allProducts, null, 2);
          await fs.promises.writeFile(this.path, productStr);
          return "Producto eliminado con éxito!";
        } catch (error) {
          console.log(error);
        }      
  };

};

module.exports = ProductManager;

