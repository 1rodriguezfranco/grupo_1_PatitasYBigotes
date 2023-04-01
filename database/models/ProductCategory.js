module.exports = function(sequelize, dataTypes){
    let alias = "ProductCategory";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: "products_categories",
        timestamps: false
    };

    let ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = function(models){
        ProductCategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "id_category"            
        })
    };

    return ProductCategory;
}