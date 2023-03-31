module.exports = function(sequelize, dataTypes){
    let alias = "ShoppingCart";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        date: {
            type: dataTypes.DATE
        },
        quantity_products: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.INTEGER
        },
        total_amount: {
            type: dataTypes.INTEGER
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        id_products_cart: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "shopping_cart",
        timestamps: false
    };

    let ShoppingCart = sequelize.define(alias, cols, config);

    ShoppingCart.associate = function(models) {
        ShoppingCart.hasOne(models.User, {
            as: "user",
            foreignKey: "id"
        }),
        ShoppingCart.belongsToMany(models.Product, {
            as: "products",
            through: "products_cart",
            foreignKey: "id_product",
            otherKey: "id_shopping_cart",
            timestamps: false            
        })
    };

    return ShoppingCart;
}