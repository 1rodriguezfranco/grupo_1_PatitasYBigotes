const db = require("../../../database/models");

const productsAPI = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: ['brand', 'pet', 'category']
      });

      const countByCategory = {
        product_category: await getCountByCategory(db.ProductCategory),
        brands: await getCountByCategory(db.Brand),
        pets: await getCountByCategory(db.Pet),
      };

      async function getCountByCategory(model) {
        const categories = await model.findAll({
          include: {
            model: db.Product,
            as: 'products',
          },
        })
        return categories.map(category => ({
        name: category.name,
        quantity: category.products.length,
        /*relation: {
            products: category.products.map(product => ({
                id: product.id,
                name: product.name,
                short_description: product.short_description,
                detail: {
                    url: `/api/products/${product.id}`
                }}))  
        }*/
        }))} 

      let respuesta = {
        count: {
          status: 200,
          quantity_of_products: products.length,
        },
        countByCategory,
        products: 
            products.map((prod) => {
            return {
            id: prod.id,
            name: prod.name,
            short_description: prod.short_description,
            /*relation: {
                categories: prod.category.map(category => ({
                    id: category.id,
                    name: category.name
                }))
            },*/
            detail: {
                url: `http://localhost:3000/api/products/${prod.id}`,
            }
        };
        })
      };
      res.json(respuesta);

    } catch (error) { console.error(error) }   
  },

  detail: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await db.Product.findByPk(productId, 
        { include: ['brand', 'pet', 'category'] });

      if(product) {
        const { id, name, short_description, long_description, image, price, discount, final_price, id_category, id_pet, id_brand } = product;
        
        const pet = await getNameById(db.Pet, id_pet);
        const brand = await getNameById(db.Brand, id_brand);
        const category = await getNameById(db.ProductCategory, id_category);

        async function getNameById(model, id) {
          let item = await model.findByPk(id)
          return item.name
        };

        let respuesta = {
          status: 200,
          data: { id, name, short_description, long_description, image, price, discount, final_price, id_category, id_pet, id_brand },
          relation: [{
            category,
            pet,
            brand
          }],
          detail: {
            url: `http://localhost:3000/images/products/${image}`
          }
        };

        res.json(respuesta);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
        }
    }
    catch (error) { console.log(error) }
  }
};

module.exports = productsAPI;
