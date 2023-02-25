const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Products = {
    productsFile: path.join(__dirname, '../data/productsDataBase.json'),

    productsList: function(){
        return JSON.parse(fs.readFileSync(this.productsFile, 'utf-8'));
    },

    findAll: function(){
        return this.productsList();
    },

    findByPk: function(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id === id);
        return productFound;
    },

    findByField: function(field, text){
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] === text);
        return productFound;
    },

    generateId: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if(lastProduct){
            return lastProduct.id + 1;
        } else{
            return 1;
        };
    },

    create: function(productData){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData,
        };
        allProducts.push(newProduct);
        fs.writeFileSync(this.productsFile, JSON.stringify(allProducts, null, 2));
    },

    edit: function(productNewData){
        let allProducts = this.findAll();
        let newProductsList = allProducts.map(product => {
            if(product.id == productNewData.id){
                return productNewData;
            }
            return product;
        });
        fs.writeFileSync(this.productsFile, JSON.stringify(newProductsList, null, 2));
    },

    delete: function(id){
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(product => product.id !== id)
        fs.writeFileSync(this.productsFile, JSON.stringify(finalProducts, null, 2));
    }
};

module.exports = Products;