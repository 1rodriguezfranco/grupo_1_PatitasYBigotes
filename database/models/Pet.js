module.exports = function(sequelize, dataTypes){
    let alias = "Pet";

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
        tableName: "pets",
        timestamps: false
    };

    let Pet = sequelize.define(alias, cols, config);

    Pet.associate = function(models){
        Pet.hasMany(models.Product, {
            as: "products",
            foreignKey: "id_pet"            
        })
    };

    return Pet;
}