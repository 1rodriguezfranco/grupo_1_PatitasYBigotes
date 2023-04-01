module.exports = function(sequelize, dataTypes){
    let alias = "Brand";

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
        tableName: "brands",
        timestamps: false
    };

    let Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models){
        Brand.hasMany(models.Product, {
            as: "products",
            foreignKey: "id_brand"            
        })
    };

    return Brand;
}