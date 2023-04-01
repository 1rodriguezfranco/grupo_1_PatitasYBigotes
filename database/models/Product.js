module.exports = function(sequelize, dataTypes){
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING
        },
        short_description: {
            type: dataTypes.STRING
        },
        long_description: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        final_price: {
            type: dataTypes.INTEGER
        },
        id_pet: {
            type: dataTypes.INTEGER
        },
        id_brand: {
            type: dataTypes.INTEGER
        },
        id_category: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "id_brand"            
        }),
        Product.belongsTo(models.Pet, {
            as: "pet",
            foreignKey: "id_pet"            
        }),
        Product.belongsTo(models.ProductCategory, {
            as: "category",
            foreignKey: "id_category"            
        }),
        Product.belongsToMany(models.ShoppingCart, {
            as: "carts",
            through: "products_cart",
            foreignKey: "id_shopping_cart",
            otherKey: "id_product",
            timestamps: false            
        })
    };

    return Product;
}